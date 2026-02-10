import { PostEntity } from '../domain/types';
import { formatTimeAgo, formatDate } from '@/shared/utils/date.utils';
import { query } from '@/shared/database/connection';

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
  image: string;
  imageSmall?: string;
  format?: "standard" | "video" | "gallery";
  featured?: boolean;
  tags?: string[];
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

  // Handle dates - MariaDB returns dates as strings, so we need to handle both types
  const publishedDate = entity.published_at || entity.created_at;
  // Ensure we have a Date object for formatTimeAgo, and use formatDate for the date string
  const dateObj = publishedDate instanceof Date ? publishedDate : new Date(publishedDate);

  return {
    id: entity.id.toString(),
    slug: entity.slug,
    title: entity.title,
    excerpt: entity.excerpt,
    content: entity.content,
    category: category[0]?.name || 'Uncategorized',
    categorySlug: category[0]?.slug || 'uncategorized',
    date: formatDate(dateObj),
    timeAgo: formatTimeAgo(dateObj),
    image: entity.featured_image_url || '',
    imageSmall: entity.featured_image_small_url || entity.featured_image_url || '',
    format: entity.format,
    featured: entity.featured,
    tags: tags.map((t) => t.tag_name),
  };
}

/**
 * Convert array of entities to posts
 */
export async function entitiesToPosts(entities: PostEntity[]): Promise<Post[]> {
  return Promise.all(entities.map(entityToPost));
}

