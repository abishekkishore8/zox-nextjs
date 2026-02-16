/**
 * Client-safe post helpers (no server/database imports).
 * Use this in client components instead of data-adapter when you only need hasThumbnail / getPostImage.
 */

/** Default thumbnail when post has no image (must match data-adapter DEFAULT_POST_IMAGE for consistency). */
export const DEFAULT_POST_IMAGE =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80';

/** Returns post image URL or default placeholder. Client-safe; use in client components instead of data-adapter.getPostImage. */
export function getPostImage(post: { image?: string; imageSmall?: string }): string {
  const url = (post.image || '').trim();
  return url || DEFAULT_POST_IMAGE;
}

/** Only the big (featured) image counts; small image is never shown site-wide. */
export function hasThumbnail(post: { image?: string; imageSmall?: string }): boolean {
  return (post.image || '').trim().length > 0;
}

/**
 * Turns excerpt (or any text) into a clean news brief: no full HTML, no {ad} placeholders.
 * Single post page uses this instead of full body content.
 */
export function toNewsBrief(text: string | undefined): string {
  if (!text || typeof text !== 'string') return '';
  let out = text
    .replace(/\s*\{ad(?:\s*[^}]*)?\}\s*/gi, ' ')
    .replace(/\s*\{advertisement(?:\s*[^}]*)?\}\s*/gi, ' ')
    .replace(/\s*\{[^}]*\}\s*/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return out;
}

/**
 * Removes leading <img> tags in html whose src matches the featured URL,
 * so the single post page doesn't show the same image 2–3 times (hero + in body).
 */
export function stripFeaturedImageFromContent(html: string, featuredUrl: string): string {
  if (!html?.trim() || !featuredUrl?.trim()) return html;
  const url = featuredUrl.trim();
  let out = html;
  const imgTagRe = /<img\s[^>]*>/i;
  let match = imgTagRe.exec(out);
  while (match) {
    const srcMatch = match[0].match(/\ssrc=["']([^"']+)["']/i);
    const imgSrc = srcMatch ? srcMatch[1].trim() : '';
    const sameImage = imgSrc === url || imgSrc.includes(url) || url.includes(imgSrc);
    if (!sameImage) break;
    out = out.replace(match[0], '');
    match = imgTagRe.exec(out);
  }
  return out;
}
