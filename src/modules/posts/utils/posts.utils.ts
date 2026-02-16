import { PostEntity } from '../domain/types';
import { formatTimeAgo, formatDate } from '@/shared/utils/date.utils';
import { query } from '@/shared/database/connection';
import { toPresignedUrlIfEnabled } from '@/shared/utils/s3-presign';

/** No fallback: posts without a real thumbnail are hidden from lists; single-post view shows no image when missing. */

/** S3 bucket host for "images from S3 only" – from NEXT_PUBLIC_IMAGE_BASE_URL or default */
function getS3ImageHost(): string {
  const base = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_IMAGE_BASE_URL) || '';
  if (base) {
    try {
      return new URL(base).hostname;
    } catch {
      /* ignore */
    }
  }
  return 'startupnews-media-2026.s3.us-east-1.amazonaws.com';
}

/** Return url only if it is from our S3 bucket; otherwise return '' so caller uses default. */
function onlyS3ImageUrl(url: string): string {
  const s = typeof url === 'string' ? url.trim() : '';
  if (!s) return '';
  const s3Host = getS3ImageHost();
  try {
    const u = new URL(s);
    const host = u.hostname;
    if (host === s3Host) return s;
    if (host === 's3.amazonaws.com' && u.pathname.replace(/^\/+/, '').startsWith('startupnews-media-2026/')) return s;
    if (host.endsWith('.s3.us-east-1.amazonaws.com') && host.startsWith('startupnews-media-2026.')) return s;
  } catch {
    /* ignore */
  }
  return '';
}

/**
 * Strip AWS S3 presigned query params (?X-Amz-Algorithm=...&X-Amz-Signature=...) from a URL.
 * Presigned URLs expire (e.g. X-Amz-Expires=300); the permanent object URL works if the bucket is public.
 */
function stripS3PresignedQuery(url: string): string {
  const s = typeof url === 'string' ? url.trim() : '';
  if (!s) return s;
  const q = s.indexOf('?');
  if (q === -1) return s;
  const query = s.slice(q + 1);
  if (/X-Amz-Algorithm|x-amz-algorithm/i.test(query)) {
    return s.slice(0, q);
  }
  return s;
}

/** Remove duplicate slashes in path (e.g. /uploads//2024/01 -> /uploads/2024/01) */
function collapseSlashes(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Convert S3 path-style URL to virtual-hosted so links match bucket and work consistently.
 * Path-style: https://s3.amazonaws.com/bucket-name/key
 * Virtual-hosted: https://bucket-name.s3.region.amazonaws.com/key
 * Uses NEXT_PUBLIC_IMAGE_BASE_URL to get canonical bucket host when present.
 */
function normalizeS3UrlToVirtualHosted(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname !== 's3.amazonaws.com') return url;
    const pathParts = u.pathname.replace(/^\/+/, '').split('/');
    if (pathParts.length < 2) return url;
    const bucket = pathParts[0];
    const key = pathParts.slice(1).join('/');
    const base = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_IMAGE_BASE_URL) || '';
    if (base) {
      const baseUrl = new URL(base);
      if (baseUrl.hostname.includes(bucket)) return collapseSlashes(baseUrl.origin + '/' + key);
      return collapseSlashes(`https://${bucket}.s3.us-east-1.amazonaws.com/${key}`);
    }
    return collapseSlashes(`https://${bucket}.s3.us-east-1.amazonaws.com/${key}`);
  } catch {
    return url;
  }
}

/**
 * If DB mistakenly stored "S3_BASE_URL + fullURL" (e.g. https://bucket.s3.../https://i0.wp.com/...),
 * return the inner part (may still contain multiple concatenated URLs).
 */
function unwrapDoubleUrl(raw: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, '');
  if (!base || !raw.startsWith(base)) return raw;
  const rest = raw.slice(base.length).replace(/^\/+/, '');
  if (rest.startsWith('https://') || rest.startsWith('http://')) return rest;
  return raw;
}

/**
 * When DB has multiple URLs concatenated (e.g. https://cdn.com/https://s3.amazonaws.com/bucket/key),
 * return the last full URL so we use one valid image URL.
 */
function extractSingleUrl(s: string): string {
  const https = s.lastIndexOf('https://');
  const http = s.lastIndexOf('http://');
  const last = https >= 0 && http >= 0 ? Math.max(https, http) : https >= 0 ? https : http;
  if (last >= 0) return s.slice(last);
  return s;
}

/**
 * Convert S3 URI (s3://bucket-name/key) to HTTPS virtual-hosted URL.
 * e.g. s3://startupnews-media-2026/uploads/2026/01/photo.jpg
 *  -> https://startupnews-media-2026.s3.us-east-1.amazonaws.com/uploads/2026/01/photo.jpg
 */
function s3UriToHttps(s3Uri: string): string {
  const m = /^s3:\/\/([^/]+)\/(.+)$/.exec(s3Uri.trim());
  if (!m) return s3Uri;
  const [, bucket, key] = m;
  const base = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_IMAGE_BASE_URL) || '';
  if (base && base.includes(bucket)) return base.replace(/\/$/, '') + '/' + key;
  return `https://${bucket}.s3.us-east-1.amazonaws.com/${key}`;
}

/**
 * S3 (or CDN) base URL for post images. When DB has a relative URL (e.g. /uploads/...),
 * it is resolved against this base so images are served from S3, not the app (Docker) origin.
 * Supports s3://bucket/key URIs; strips presigned params; normalizes path-style S3; collapses slashes.
 * Fixes link mismatch when DB has "S3_BASE + fullURL" by unwrapping and taking a single URL.
 * Set in .env: NEXT_PUBLIC_IMAGE_BASE_URL=https://startupnews-media-2026.s3.us-east-1.amazonaws.com
 * Optional: S3_UPLOAD_PREFIX=startupnews-in so URLs like /uploads/... are rewritten to /startupnews-in/uploads/...
 */
function resolvePostImageUrl(raw: string): string {
  let s = typeof raw === 'string' ? raw.trim() : '';
  if (!s) return s;
  if (s.startsWith('s3://')) s = s3UriToHttps(s);
  const base = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_IMAGE_BASE_URL) || '';
  const siteBase = (typeof process !== 'undefined' && (process.env?.WP_SITE_URL || process.env?.NEXT_PUBLIC_SITE_URL)) || '';
  let out: string;
  if (s.startsWith('http://') || s.startsWith('https://')) {
    out = extractSingleUrl(unwrapDoubleUrl(s, base));
  } else {
    const path = s.startsWith('/') ? s : '/' + s;
    // Relative paths under /uploads/ go to S3; other relative paths (e.g. /wp-content/) use site URL so they load
    if (path.startsWith('/uploads/') || path.startsWith('/uploads')) {
      out = base ? base.replace(/\/$/, '') + path : s;
    } else if (siteBase) {
      out = siteBase.replace(/\/$/, '') + path;
    } else {
      out = base ? base.replace(/\/$/, '') + path : s;
    }
  }
  out = stripS3PresignedQuery(out);
  out = collapseSlashes(out);
  try {
    const u = new URL(out);
    if (u.hostname === 's3.amazonaws.com') out = normalizeS3UrlToVirtualHosted(out);
    // If objects live under S3_UPLOAD_PREFIX (e.g. startupnews-in/) but DB has /uploads/..., prepend prefix
    const prefix = (typeof process !== 'undefined' && process.env?.S3_UPLOAD_PREFIX) || '';
    const s3Host = getS3ImageHost();
    if (prefix) {
      const u2 = new URL(out);
      if (u2.hostname === s3Host) {
        const path = u2.pathname.replace(/^\/+/, '');
        const prefixNorm = prefix.replace(/^\/|\/$/g, '');
        if (path.startsWith('uploads/') && !path.startsWith(prefixNorm + '/')) {
          out = u2.origin + '/' + prefixNorm + '/' + path;
        }
      }
    }
  } catch {
    /* leave out unchanged */
  }
  return out || '';
}

/** Coerce DB value to string (handles Buffer, null, undefined) */
function toImageUrlString(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'string') return v.trim();
  if (Buffer.isBuffer(v)) return v.toString('utf8').trim();
  return String(v).trim();
}

/**
 * Read a string from entity with flexible key lookup (DB drivers may return different casings).
 * Tries preferred keys first, then any key that lowercases to match; coerces Buffer to string.
 */
function getEntityString(obj: Record<string, unknown>, ...preferredKeys: string[]): string {
  const lower = (s: string) => s.toLowerCase();
  for (const k of preferredKeys) {
    const v = obj[k];
    if (v != null && (typeof v === 'string' || Buffer.isBuffer(v))) return toImageUrlString(v);
  }
  const firstKey = preferredKeys[0];
  if (!firstKey) return '';
  for (const key of Object.keys(obj)) {
    if (lower(key) === lower(firstKey)) {
      const v = obj[key];
      if (v != null && (typeof v === 'string' || Buffer.isBuffer(v))) return toImageUrlString(v);
    }
  }
  return '';
}

/** Normalize content to string (LONGTEXT can come as Buffer from some drivers) */
function contentToString(content: unknown): string {
  if (content == null) return '';
  if (typeof content === 'string') return content;
  if (Buffer.isBuffer(content)) return content.toString('utf8');
  // Redis/cache may return serialized Buffer as { type: 'Buffer', data: number[] }
  const bufLike = content as { type?: string; data?: number[] };
  if (bufLike?.type === 'Buffer' && Array.isArray(bufLike.data)) {
    return Buffer.from(bufLike.data).toString('utf8');
  }
  return String(content);
}

/** Decode HTML entities in a URL so it works as a real URL (e.g. &amp; -> &). */
function decodeUrlHtmlEntities(url: string): string {
  return url
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
}

/** Extract first real (non-logo, non-data) image URL from HTML. Skips logos/favicons so thumbnails show article images. */
function getFirstImageUrlFromContent(content: unknown): string {
  const str = contentToString(content);
  if (!str) return '';
  const normalized = str.replace(/&quot;/gi, '"').replace(/&#39;/g, "'").replace(/&amp;/gi, '&');
  // Collect all candidate URLs from img/source, then return first that is not logo/favicon/data
  const candidates: string[] = [];
  const imgRe = /<img[^>]*(?:src|data-src)\s*=\s*["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = imgRe.exec(normalized)) !== null) {
    const url = decodeUrlHtmlEntities(m[1].trim());
    if (url && !url.startsWith('data:')) candidates.push(url);
  }
  const sourceRe = /<source[^>]+src\s*=\s*["']([^"']+)["']/gi;
  while ((m = sourceRe.exec(normalized)) !== null) {
    const url = decodeUrlHtmlEntities(m[1].trim());
    if (url && !url.startsWith('data:')) candidates.push(url);
  }
  for (const url of candidates) {
    if (!isLogoOrFaviconUrl(url)) return url;
  }
  // Fallback: first img/source URL even if logo (better than nothing)
  if (candidates[0]) return candidates[0];
  // Last resort: first URL in content that looks like an image
  const urlInContent = normalized.match(/https?:\/\/[^\s"'<>]+\.(?:jpe?g|png|gif|webp|avif)(?:\?[^"'\s]*)?/i);
  if (urlInContent?.[0]) {
    const url = decodeUrlHtmlEntities(urlInContent[0].trim());
    if (url && !isLogoOrFaviconUrl(url)) return url;
  }
  return '';
}

/** Extract all img src/data-src URLs from HTML (order preserved). Handles Buffer. */
function getAllImageUrlsFromContent(content: unknown): string[] {
  const str = contentToString(content);
  if (!str) return [];
  const re = /<img[^>]*(?:src|data-src)=["']([^"']+)["']/gi;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(str)) !== null) {
    const s = decodeUrlHtmlEntities(m[1].trim());
    if (s && !s.startsWith('data:')) out.push(s);
  }
  return out;
}

/** When featured_image_url is empty, use first image in content that resolves to our S3 (so cards show different images) */
function getFirstS3ImageUrlFromContent(content: unknown): string {
  const urls = getAllImageUrlsFromContent(content);
  for (const raw of urls) {
    const resolved = resolvePostImageUrl(raw);
    const s3 = onlyS3ImageUrl(resolved);
    if (s3) return s3;
  }
  return '';
}

const UNSPLASH_IMAGE_PREFIX = 'https://images.unsplash.com/';

/** URLs that are typically logos/favicons – treat as "no image" so we use content or default instead. */
function isLogoOrFaviconUrl(url: string): boolean {
  const u = (url || '').trim().toLowerCase();
  if (!u) return true;
  return (
    u.includes('twitter.com') ||
    u.includes('twimg.com') ||
    u.includes('favicon') ||
    u.includes('logo') ||
    u.includes('chrome.google.com') ||
    u.includes('google.com/icon') ||
    /\/logos?\//i.test(u) ||
    /\/favicon\./i.test(u)
  );
}

/** Prefer first image from content so list thumbnails match the post body; use featured only when content has no image. */
function getEntityImageUrl(entity: PostEntity & Record<string, unknown>): string {
  const content = entity.content ?? (entity as Record<string, unknown>)['content'];
  const fromContent = getFirstImageUrlFromContent(content);
  if (fromContent) return fromContent;
  const url = getEntityString(entity as Record<string, unknown>, 'featured_image_url', 'featured_image_small_url');
  // Allow Unsplash images as valid thumbnails (they're used as placeholders and manual posts may use them)
  if (url && url.trim() && !isLogoOrFaviconUrl(url)) return url;
  return '';
}

function getEntityImageSmallUrl(entity: PostEntity & Record<string, unknown>): string {
  const content = entity.content ?? (entity as Record<string, unknown>)['content'];
  const fromContent = getFirstImageUrlFromContent(content);
  if (fromContent) return fromContent;
  const url = getEntityString(entity as Record<string, unknown>, 'featured_image_small_url', 'featured_image_url');
  // Allow Unsplash images as valid thumbnails (they're used as placeholders and manual posts may use them)
  if (url && url.trim() && !isLogoOrFaviconUrl(url)) return url;
  return '';
}

// Post interface matching the existing one for backward compatibility
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  timeAgo: string;
  /** ISO date string for sorting (latest first) */
  publishedAt?: string;
  image: string;
  imageSmall?: string;
  format?: "standard" | "video" | "gallery";
  featured?: boolean;
  tags?: string[];
  /** draft | published | archived */
  status?: string;
  /** Original article URL (e.g. from RSS) */
  sourceUrl?: string;
  /** RSS source attribution (feed name, logo, author) – set by data-adapter when post is from RSS */
  sourceName?: string;
  sourceLogoUrl?: string | null;
  sourceAuthor?: string | null;
}

/**
 * Convert PostEntity (database) to Post (domain/API)
 * This maintains backward compatibility with existing Post interface
 */
export async function entityToPost(entity: PostEntity): Promise<Post> {
  // Get category info
  const category = await query<{ name: string; slug: string }>(
    'SELECT name, slug FROM categories WHERE id = ?',
    [entity.category_id]
  );

  // Get tags
  const tags = await query<{ tag_name: string }>(
    'SELECT tag_name FROM post_tags WHERE post_id = ?',
    [entity.id]
  );

  // Handle dates - prefer the latest known timestamp so newly inserted posts appear as recent.
  const createdDateObj = entity.created_at instanceof Date ? entity.created_at : new Date(entity.created_at);
  const publishedDateObj = entity.published_at
    ? (entity.published_at instanceof Date ? entity.published_at : new Date(entity.published_at))
    : null;
  const dateObj = publishedDateObj && publishedDateObj > createdDateObj ? publishedDateObj : createdDateObj;
  const publishedAt = dateObj.toISOString();

  const resolvedImage = resolvePostImageUrl(getEntityImageUrl(entity as PostEntity & Record<string, unknown>));
  const resolvedSmall = resolvePostImageUrl(getEntityImageSmallUrl(entity as PostEntity & Record<string, unknown>));
  let imageS3 = onlyS3ImageUrl(resolvedImage) || onlyS3ImageUrl(resolvedSmall);
  let imageSmallS3 = onlyS3ImageUrl(resolvedSmall) || onlyS3ImageUrl(resolvedImage);
  const contentStr = contentToString(entity.content ?? (entity as unknown as Record<string, unknown>)['content']);
  // When no featured/entity image, use first in-content image that is our S3
  if (!imageS3) {
    const fromContent = getFirstS3ImageUrlFromContent(contentStr);
    if (fromContent) {
      imageS3 = fromContent;
      imageSmallS3 = imageSmallS3 || fromContent;
    }
  }
  // Always derive first image from content so list thumbnails match what's inside the post (single-page shows content images)
  let fallbackImage = '';
  const firstFromContent = getFirstImageUrlFromContent(contentStr);
  if (firstFromContent) fallbackImage = resolvePostImageUrl(firstFromContent).trim();
  if (fallbackImage) {
    fallbackImage = (await toPresignedUrlIfEnabled(fallbackImage)) || fallbackImage;
  }
  if (imageS3 || imageSmallS3) {
    const [signedImage, signedSmall] = await Promise.all([
      imageS3 ? toPresignedUrlIfEnabled(imageS3) : Promise.resolve(''),
      imageSmallS3 ? toPresignedUrlIfEnabled(imageSmallS3) : Promise.resolve(''),
    ]);
    if (signedImage) imageS3 = signedImage;
    if (signedSmall) imageSmallS3 = signedSmall;
  }

  /* Prefer S3/featured image so single-post page and listings get a URL that loads reliably (no hotlink 403 from external content images). */
  const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80';
  const useResolved =
    resolvedImage &&
    resolvedImage.trim() &&
    !isLogoOrFaviconUrl(resolvedImage);
  const useResolvedSmall =
    resolvedSmall &&
    resolvedSmall.trim() &&
    !isLogoOrFaviconUrl(resolvedSmall);
  // Use first-from-content only when it's our S3; never use external content URLs (they often 403 on load).
  const contentImageS3 = fallbackImage && onlyS3ImageUrl(fallbackImage) ? fallbackImage : '';
  const finalImage =
    imageS3 ||
    (useResolved ? resolvedImage : '') ||
    contentImageS3 ||
    DEFAULT_THUMBNAIL;
  const finalImageSmall =
    imageSmallS3 ||
    imageS3 ||
    (useResolvedSmall ? resolvedSmall : '') ||
    contentImageS3 ||
    DEFAULT_THUMBNAIL;

  return {
    id: entity.id.toString(),
    slug: entity.slug,
    title: entity.title,
    excerpt: entity.excerpt,
    content: typeof entity.content === 'string' ? entity.content : contentStr,
    category: category[0]?.name || 'Uncategorized',
    categorySlug: category[0]?.slug || 'uncategorized',
    date: formatDate(dateObj),
    timeAgo: formatTimeAgo(dateObj),
    publishedAt,
    image: finalImage,
    imageSmall: finalImageSmall || finalImage,
    format: entity.format,
    featured: entity.featured,
    tags: tags.map((t) => t.tag_name),
    status: entity.status ?? 'draft',
  };
}

/**
 * Convert array of entities to posts
 */
export async function entitiesToPosts(entities: PostEntity[]): Promise<Post[]> {
  return Promise.all(entities.map(entityToPost));
}

/**
 * Lightweight conversion for admin list: no per-post DB or S3 calls.
 * Caller must batch-fetch categories and tags and pass as maps.
 */
export function entitiesToAdminListPosts(
  entities: PostEntity[],
  categoryMap: Map<number, { name: string; slug: string }>,
  tagsByPostId: Map<number, string[]>
): Post[] {
  return entities.map((entity) => {
    const cat = categoryMap.get(entity.category_id) ?? { name: 'Uncategorized', slug: 'uncategorized' };
    const createdDateObj = entity.created_at instanceof Date ? entity.created_at : new Date(entity.created_at);
    const publishedDateObj = entity.published_at
      ? (entity.published_at instanceof Date ? entity.published_at : new Date(entity.published_at))
      : null;
    const dateObj = publishedDateObj && publishedDateObj > createdDateObj ? publishedDateObj : createdDateObj;
    const tags = tagsByPostId.get(entity.id) ?? [];
    return {
      id: entity.id.toString(),
      slug: entity.slug,
      title: entity.title,
      excerpt: entity.excerpt ?? '',
      content: '', // Omit full content for list
      category: cat.name,
      categorySlug: cat.slug,
      date: formatDate(dateObj),
      timeAgo: formatTimeAgo(dateObj),
      publishedAt: dateObj.toISOString(),
      image: '',
      imageSmall: '',
      format: entity.format,
      featured: entity.featured,
      tags,
      status: entity.status ?? 'draft',
    };
  });
}