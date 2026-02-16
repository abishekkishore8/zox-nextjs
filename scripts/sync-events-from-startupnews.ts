/**
 * Fetch events from https://startupnews.fyi/startup-events/, parse HTML.
 * For each event fetch its detail page to get og:image (banner) and description;
 * upload banner to S3, then clear events table and insert all.
 *
 * Requires .env.local: DB_*, AWS_* (for S3), S3_BUCKET, S3_IMAGE_BASE_URL (or NEXT_PUBLIC_IMAGE_BASE_URL).
 *
 * Usage: npx tsx scripts/sync-events-from-startupnews.ts [--dry-run] [--limit N]
 */

import mariadb from 'mariadb';
import { loadEnvConfig } from '@next/env';
import {
  downloadAndUploadEventImageToS3,
  downloadAndUploadToS3,
  isS3Configured,
} from '../src/modules/rss-feeds/utils/image-to-s3';

loadEnvConfig(process.cwd());

const SOURCE_URL = 'https://startupnews.fyi/startup-events/';
const FETCH_DELAY_MS = 400;
const DB = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'zox_db',
};

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const REGION_MAP: Record<string, string> = {
  'Delhi NCR': 'Delhi NCR',
  'Bengaluru': 'Bengaluru',
  'Mumbai': 'Mumbai',
  'Hyderabad': 'Hyderabad',
  'Other Cities': 'Other Cities',
  'International': 'International Events',
  'Dubai': 'Dubai',
  'Co-Hort': 'Cohort',
  'Online': 'Online',
};

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/** Parse "3 January 2026" or "30 January - 1 February" to Date (use first date). */
function parseEventDate(text: string): Date {
  const t = text.trim();
  const yearMatch = t.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();
  const firstDateMatch = t.match(/(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i);
  if (firstDateMatch) {
    const day = parseInt(firstDateMatch[1], 10);
    const monthName = firstDateMatch[2].toLowerCase();
    const month = MONTHS[monthName] ?? 0;
    const d = new Date(year, month, day);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date(year, 0, 1);
}

function slugFromUrl(url: string): string {
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '');
  const segment = path.split('/').filter(Boolean).pop() || '';
  return segment || `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface ParsedEvent {
  title: string;
  externalUrl: string;
  slug: string;
  location: string;
  eventDate: Date;
  dateText: string;
}

/** Extract og:image URL from event page HTML. */
function extractOgImage(html: string): string | null {
  const m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  if (m && m[1]) {
    const url = m[1].trim().replace(/&amp;/g, '&');
    if (url.startsWith('http')) return url;
  }
  return null;
}

/** Extract meta description or og:description for excerpt. */
function extractExcerpt(html: string): string | null {
  const m = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)
    || html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (m && m[1]) {
    const s = m[1].trim()
      .replace(/&amp;/g, '&')
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"');
    return s.slice(0, 500) || null;
  }
  return null;
}

/** Extract event description from page (first substantial paragraph after Event Description). */
function extractDescription(html: string): string | null {
  const match = html.match(/Event Description[\s\S]*?<(?:div|p)[^>]*>([\s\S]*?)<\/(?:div|p)>/i)
    || html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
  if (match && match[1]) {
    const raw = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return raw.slice(0, 2000) || null;
  }
  return null;
}

function parseHtml(html: string): ParsedEvent[] {
  const events: ParsedEvent[] = [];
  const regionOrder = Object.keys(REGION_MAP);
  const linkRegex = /<a\s+href="(https:\/\/startupnews\.fyi\/startup-events\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
  const headingRegex = new RegExp(
    `<(?:h2|h3)[^>]*>\\s*([^<]*?)\\s*</(?:h2|h3)>`,
    'gi'
  );

  const linkMatches: { index: number; url: string; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = linkRegex.exec(html)) !== null) {
    const url = m[1];
    const text = decodeEntities(m[2].trim());
    if (!url || url === SOURCE_URL || !text) continue;
    if (!/^https:\/\/startupnews\.fyi\/startup-events\/[^/]+\/?$/.test(url)) continue;
    linkMatches.push({ index: m.index, url, text });
  }

  const headings: { index: number; name: string }[] = [];
  while ((m = headingRegex.exec(html)) !== null) {
    const name = m[1].trim();
    const normalized = regionOrder.find((r) =>
      name.toLowerCase().includes(r.toLowerCase())
    );
    if (normalized) headings.push({ index: m.index, name: REGION_MAP[normalized] || name });
  }

  for (const { index: linkIndex, url, text } of linkMatches) {
    const prevHeading = [...headings].reverse().find((h) => h.index < linkIndex);
    const region = prevHeading?.name || 'Other Cities';
    const parts = text.split('|').map((p) => p.trim());
    const title = parts[0] || text;
    const datePart = parts.length > 1 ? parts[parts.length - 1] : '';
    const eventDate = parseEventDate(datePart);
    events.push({
      title,
      externalUrl: url,
      slug: slugFromUrl(url),
      location: region,
      eventDate,
      dateText: datePart || eventDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    });
  }

  return events;
}

interface EnrichedEvent extends ParsedEvent {
  /** Banner image: first source URL from og:image, then replaced by S3 URL after upload */
  imageUrl: string | null;
  excerpt: string | null;
  description: string | null;
}

async function fetchEventPageDetails(event: ParsedEvent, dryRun: boolean): Promise<EnrichedEvent> {
  let imageUrl: string | null = null;
  let excerpt: string | null = null;
  let description: string | null = null;

  try {
    const res = await fetch(event.externalUrl, {
      headers: { 'User-Agent': 'StartupNews-Sync/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { ...event, imageUrl, excerpt, description };
    const html = await res.text();
    imageUrl = extractOgImage(html);
    excerpt = extractExcerpt(html);
    description = extractDescription(html);
  } catch {
    // keep nulls
  }

  return { ...event, imageUrl, excerpt, description };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitArg = process.argv.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;
  if (dryRun) console.log('DRY RUN – no DB or S3 writes');

  const res = await fetch(SOURCE_URL, {
    headers: { 'User-Agent': 'StartupNews-Sync/1.0' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const html = await res.text();
  const parsed = parseHtml(html);

  const bySlug = new Map<string, ParsedEvent>();
  for (const e of parsed) {
    if (!bySlug.has(e.slug)) bySlug.set(e.slug, e);
  }
  let unique = [...bySlug.values()];
  if (limit && limit > 0) unique = unique.slice(0, limit);
  console.log(`Parsed ${unique.length} unique events from ${SOURCE_URL}`);

  const enriched: EnrichedEvent[] = [];
  for (let i = 0; i < unique.length; i++) {
    const e = unique[i];
    process.stdout.write(`\rFetching event ${i + 1}/${unique.length}: ${e.slug.slice(0, 40)}...`);
    const detail = await fetchEventPageDetails(e, dryRun);
    enriched.push(detail);
    if (!dryRun && i < unique.length - 1) await sleep(FETCH_DELAY_MS);
  }
  console.log('');

  if (isS3Configured() && !dryRun) {
    for (let i = 0; i < enriched.length; i++) {
      const e = enriched[i];
      let s3ImageUrl: string | null = null;
      if (e.imageUrl && e.imageUrl.startsWith('http')) {
        s3ImageUrl = await downloadAndUploadEventImageToS3(e.slug, e.imageUrl);
        if (s3ImageUrl) enriched[i].imageUrl = s3ImageUrl;
      }
      if (!s3ImageUrl) {
        const fallback = await downloadAndUploadToS3(
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
          `event-default-${e.slug.slice(0, 30)}`
        );
        if (fallback) enriched[i].imageUrl = fallback;
      }
      process.stdout.write(`\rUploaded images ${i + 1}/${enriched.length}`);
      if (i < enriched.length - 1) await sleep(200);
    }
    console.log('');
  }

  if (!dryRun && DB.user && DB.password) {
    const conn = await mariadb.createConnection(DB);
    try {
      await conn.query('DELETE FROM events');
      console.log('Cleared events table');
      const insertSql = `
        INSERT INTO events (title, slug, excerpt, description, location, event_date, event_time, image_url, external_url, status)
        VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?, 'upcoming')
      `;
      for (const e of enriched) {
        const imageUrl = e.imageUrl && e.imageUrl.startsWith('http') ? e.imageUrl : null;
        await conn.query(insertSql, [
          e.title.slice(0, 500),
          e.slug.slice(0, 500),
          e.excerpt || null,
          e.description || null,
          e.location,
          e.eventDate,
          imageUrl,
          e.externalUrl,
        ]);
      }
      console.log(`Inserted ${enriched.length} events`);
    } finally {
      await conn.end();
    }
  } else if (dryRun) {
    const withBanner = enriched.filter((e) => e.imageUrl);
    console.log(`Would insert ${enriched.length} events (${withBanner.length} with banner from page). Sample:`, enriched.slice(0, 2).map((e) => ({ title: e.title, imageUrl: e.imageUrl ? 'yes' : 'no', excerpt: e.excerpt?.slice(0, 60) })));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
