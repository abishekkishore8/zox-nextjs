/**
 * Post domain types
 * These match the existing Post interface for backward compatibility
 */

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
 * Database entity (internal representation)
 */
export interface PostEntity {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category_id: number;
  author_id: number;
  featured_image_url?: string;
  featured_image_small_url?: string;
  format: "standard" | "video" | "gallery";
  status: "draft" | "published" | "archived";
  featured: boolean;
  trending_score: number;
  view_count: number;
  // Dates from MariaDB are returned as strings, but we type them as Date | string for flexibility
  published_at?: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * DTOs for API
 */
export interface CreatePostDto {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: number;
  authorId: number;
  featuredImageUrl?: string;
  featuredImageSmallUrl?: string;
  format?: "standard" | "video" | "gallery";
  status?: "draft" | "published";
  featured?: boolean;
}

export interface UpdatePostDto extends Partial<CreatePostDto> {
  id: number;
}

