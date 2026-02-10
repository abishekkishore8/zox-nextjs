import { PostsRepository } from '../repository/posts.repository';
import { PostEntity } from '../domain/types';
import { getCache, setCache, deleteCache } from '@/shared/cache/redis.client';
import { CategoriesService } from '@/modules/categories/service/categories.service';

export class PostsService {
  constructor(
    private repository: PostsRepository,
    private categoriesService?: CategoriesService
  ) {}

  /**
   * Get all posts with optional filters
   */
  async getAllPosts(filters?: {
    categorySlug?: string;
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<PostEntity[]> {
    const cacheKey = `posts:all:${JSON.stringify(filters)}`;
    
    // Try cache first
    const cached = await getCache<PostEntity[]>(cacheKey);
    if (cached) return cached;

    // If category slug provided, need to resolve category ID
    let categoryId: number | undefined;
    if (filters?.categorySlug) {
      if (this.categoriesService) {
        const id = await this.categoriesService.getCategoryIdBySlug(filters.categorySlug);
        categoryId = id ?? undefined;
      } else {
        // Fallback to direct query if categories service not available
        const { query } = await import('@/shared/database/connection');
        const category = await query<{ id: number }>('SELECT id FROM categories WHERE slug = ?', [filters.categorySlug]);
        categoryId = category[0]?.id;
      }
    }

    const posts = await this.repository.findAll({
      ...filters,
      categoryId,
      search: filters?.search,
    });

    // Cache for 5 minutes
    await setCache(cacheKey, posts, 300);
    return posts;
  }

  /**
   * Get post by slug
   */
  async getPostBySlug(slug: string): Promise<PostEntity | null> {
    const cacheKey = `post:slug:${slug}`;
    
    const cached = await getCache<PostEntity>(cacheKey);
    if (cached) return cached;

    const post = await this.repository.findBySlug(slug);
    if (post) {
      await setCache(cacheKey, post, 600); // Cache for 10 minutes
    }
    return post;
  }

  /**
   * Get posts by category slug
   */
  async getPostsByCategory(categorySlug: string, limit: number = 10): Promise<PostEntity[]> {
    return this.repository.findByCategorySlug(categorySlug, limit);
  }

  /**
   * Get featured posts
   */
  async getFeaturedPosts(limit: number = 5): Promise<PostEntity[]> {
    return this.repository.findFeatured(limit);
  }

  /**
   * Get trending posts
   */
  async getTrendingPosts(limit: number = 5, excludeIds: (number | string)[] = []): Promise<PostEntity[]> {
    const excludeNums = excludeIds.map(id => typeof id === 'string' ? parseInt(id) : id).filter(id => !isNaN(id));
    return this.repository.findTrending(limit, excludeNums);
  }

  /**
   * Search posts
   */
  async searchPosts(queryText: string, limit: number = 20): Promise<PostEntity[]> {
    return this.repository.search(queryText, limit);
  }

  /**
   * Get related posts
   */
  async getRelatedPosts(
    excludeSlug: string,
    categorySlug: string,
    limit: number = 6
  ): Promise<PostEntity[]> {
    // First try same category
    const sameCategory = await this.repository.findByCategorySlug(categorySlug, limit * 2);
    const filtered = sameCategory.filter((p) => p.slug !== excludeSlug).slice(0, limit);

    if (filtered.length >= limit) {
      return filtered;
    }

    // Fill with other posts
    const allPosts = await this.repository.findAll({ status: 'published', limit: limit * 2 });
    const others = allPosts
      .filter((p) => p.slug !== excludeSlug && !filtered.find((f) => f.id === p.id))
      .slice(0, limit - filtered.length);

    return [...filtered, ...others];
  }

  /**
   * Get previous/next posts
   */
  async getPrevNextPosts(currentSlug: string): Promise<{ prev: PostEntity | null; next: PostEntity | null }> {
    const allPosts = await this.repository.findAll({ status: 'published' });
    const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

    if (currentIndex < 0) {
      return { prev: null, next: null };
    }

    const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prev, next };
  }

  /**
   * Increment view count
   */
  async incrementViewCount(slug: string): Promise<void> {
    const post = await this.repository.findBySlug(slug);
    if (post) {
      await this.repository.incrementViewCount(post.id);
      // Invalidate cache
      await deleteCache(`post:slug:${slug}`);
    }
  }

  /**
   * Create post
   */
  async createPost(data: {
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
  }): Promise<PostEntity> {
    // Check if slug exists
    const existingPost = await this.repository.findBySlug(data.slug);
    if (existingPost) {
      throw new Error(`Post with slug "${data.slug}" already exists`);
    }

    // Verify category exists
    if (this.categoriesService) {
      const category = await this.categoriesService.getCategoryById(data.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${data.categoryId} not found`);
      }
    }

    const entity = await this.repository.create(data);
    
    // Invalidate cache
    await this.invalidatePostCache();
    
    return entity;
  }

  /**
   * Update post
   */
  async updatePost(id: number, data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: number;
    authorId: number;
    featuredImageUrl: string;
    featuredImageSmallUrl: string;
    format: "standard" | "video" | "gallery";
    status: "draft" | "published" | "archived";
    featured: boolean;
  }>): Promise<PostEntity> {
    const existingPost = await this.repository.findById(id);
    if (!existingPost) {
      throw new Error(`Post with ID ${id} not found`);
    }

    // If slug is being updated, check if it exists
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await this.repository.findBySlug(data.slug);
      if (slugExists) {
        throw new Error(`Post with slug "${data.slug}" already exists`);
      }
    }

    // If category is being updated, verify it exists
    if (data.categoryId && this.categoriesService) {
      const category = await this.categoriesService.getCategoryById(data.categoryId);
      if (!category) {
        throw new Error(`Category with ID ${data.categoryId} not found`);
      }
    }

    // Convert camelCase to snake_case for database
    const updateData: Partial<PostEntity> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.categoryId !== undefined) updateData.category_id = data.categoryId;
    if (data.authorId !== undefined) updateData.author_id = data.authorId;
    if (data.featuredImageUrl !== undefined) updateData.featured_image_url = data.featuredImageUrl;
    if (data.featuredImageSmallUrl !== undefined) updateData.featured_image_small_url = data.featuredImageSmallUrl;
    if (data.format !== undefined) updateData.format = data.format;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.featured !== undefined) updateData.featured = data.featured;

    // Handle published_at based on status
    if (data.status === 'published' && existingPost.status !== 'published') {
      updateData.published_at = new Date();
    } else if (data.status && data.status !== 'published' && existingPost.published_at) {
      updateData.published_at = null as unknown as Date; // Allow null for unpublished posts
    }

    const entity = await this.repository.update(id, updateData);
    
    // Invalidate cache
    await this.invalidatePostCache();
    if (entity.slug) {
      await deleteCache(`post:slug:${entity.slug}`);
    }
    
    return entity;
  }

  /**
   * Delete post
   */
  async deletePost(id: number): Promise<void> {
    const post = await this.repository.findById(id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }

    await this.repository.delete(id);
    
    // Invalidate cache
    await this.invalidatePostCache();
    await deleteCache(`post:slug:${post.slug}`);
  }

  /**
   * Invalidate all post caches
   */
  private async invalidatePostCache(): Promise<void> {
    // Clear common cache patterns
    // In production, you might want to use cache tags for more efficient invalidation
    // Note: Pattern-based deletion would require Redis SCAN or similar
    // For now, cache will expire naturally
  }
}

