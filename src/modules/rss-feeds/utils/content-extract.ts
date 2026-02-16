/**
 * Extract article body HTML and image URLs from a full page HTML.
 * Used when RSS only has summary; we fetch the article URL and pull main content + images.
 */

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function toAbsoluteUrl(raw: string, baseUrl: string): string {
  let src = decodeHtmlEntities(raw.trim());
  if (!src) return '';
  if (src.startsWith('//')) return `https:${src}`;
  if (src.startsWith('/')) return `${baseUrl.replace(/\/$/, '')}${src}`;
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    return `${baseUrl.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
  }
  return src;
}

function firstUrlFromSrcset(raw: string): string {
  const srcset = decodeHtmlEntities(raw || '');
  if (!srcset) return '';
  const first = srcset.split(',')[0]?.trim() || '';
  if (!first) return '';
  return first.split(/\s+/)[0] || '';
}

function getAttr(tag: string, name: string): string {
  const re = new RegExp(`${name}=["']([^"']+)["']`, 'i');
  const m = tag.match(re);
  return m?.[1]?.trim() || '';
}

/**
 * Extract all image URLs from HTML img tags (src, data-src, lazy attrs, srcset), absolute and deduped.
 */
export function extractImageUrlsFromHtml(html: string, baseUrl: string): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  const tagRegex = /<img\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = tagRegex.exec(html)) !== null) {
    const tag = m[0];
    const candidates = [
      getAttr(tag, 'src'),
      getAttr(tag, 'data-src'),
      getAttr(tag, 'data-lazy-src'),
      getAttr(tag, 'data-original'),
      firstUrlFromSrcset(getAttr(tag, 'srcset')),
      firstUrlFromSrcset(getAttr(tag, 'data-srcset')),
    ].filter(Boolean);

    for (const candidate of candidates) {
      const abs = toAbsoluteUrl(candidate, baseUrl);
      if (!abs || abs.startsWith('data:') || seen.has(abs)) continue;
      seen.add(abs);
      urls.push(abs);
    }
  }
  return urls;
}

/**
 * Extract best primary image URL from page HTML metadata (og/twitter/link image_src).
 */
export function extractPrimaryImageFromHtml(html: string, baseUrl: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
    /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']image_src["']/i,
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match?.[1]) {
      const abs = toAbsoluteUrl(match[1], baseUrl);
      if (abs && !abs.startsWith('data:')) return abs;
    }
  }
  return null;
}

/** Minimum length to consider a chunk as valid article content */
const MIN_ARTICLE_LENGTH = 150;

/** Try to extract main article HTML from full page. Uses multiple selectors and returns the longest match. */
export function extractArticleHtml(html: string): string {
  const candidates: string[] = [];
  // Selectors that typically wrap the full article body (order doesn't matter; we take longest)
  const selectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/gi,
    /<main[^>]*>([\s\S]*?)<\/main>/gi,
    /<div[^>]+(?:class|id)="[^"]*story-body[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*story-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+(?:class|id)="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+id="content"[^>]*>([\s\S]*?)<\/div>/gi,
    /<section[^>]+(?:class|id)="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/section>/gi,
  ];
  for (const re of selectors) {
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(html)) !== null) {
      const raw = m[1]?.trim() ?? '';
      if (raw.length > MIN_ARTICLE_LENGTH) {
        const cleaned = stripScriptsAndStyles(raw);
        if (cleaned.length > MIN_ARTICLE_LENGTH) candidates.push(cleaned);
      }
    }
  }
  // Prefer the longest candidate (likely the full article)
  if (candidates.length > 0) {
    candidates.sort((a, b) => b.length - a.length);
    return candidates[0];
  }
  // Fallback: strip scripts/styles from full body and use that
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const chunk = bodyMatch ? bodyMatch[1] : html;
  return stripScriptsAndStyles(chunk);
}

function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}
