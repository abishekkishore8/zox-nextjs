import { query, queryOne, getDbConnection } from '@/shared/database/connection';
import { PostEntity } from '../domain/types';

/** Only show published posts that have body (content) and at least one image (featured or <img> in content). */
const HAS_BODY_AND_IMAGE =
  " AND (TRIM(COALESCE(content, '')) != '' AND (TRIM(COALESCE(featured_image_url, '')) != '' OR content LIKE '%<img%'))";

export class PostsRepository {
  /**
   * Find all posts with optional filters
   */
  async findAll(filters?: {
    categoryId?: number;
    categorySlug?: string;
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
    search?: string;
    source?: 'manual' | 'rss';
    /** When false, do not restrict published posts to those with S3 thumbnail (e.g. for admin list) */
    restrictThumbnail?: boolean;
  }): Promise<PostEntity[]> {
    let sql = 'SELECT * FROM posts WHERE 1=1';
    const params: (string | number | boolean | null)[] = [];
    const restrictThumbnail = filters?.restrictThumbnail !== false;

    if (filters?.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
      if (filters.status === 'published' && restrictThumbnail) sql += HAS_BODY_AND_IMAGE;
    }

    if (filters?.source === 'rss') {
      sql += ' AND id IN (SELECT post_id FROM rss_feed_items WHERE post_id IS NOT NULL)';
    } else if (filters?.source === 'manual') {
      sql += ' AND id NOT IN (SELECT post_id FROM rss_feed_items WHERE post_id IS NOT NULL)';
    }

    if (filters?.featured !== undefined) {
      sql += ' AND featured = ?';
      params.push(filters.featured ? 1 : 0);
    }

    if (filters?.search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR slug LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY id DESC';

    if (filters?.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    if (filters?.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return query<PostEntity>(sql, params);
  }

  /**
   * Count posts with optional filters
   */
  async count(filters?: {
    categoryId?: number;
    status?: string;
    featured?: boolean;
    search?: string;
    source?: 'manual' | 'rss';
    restrictThumbnail?: boolean;
  }): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM posts WHERE 1=1';
    const params: (string | number | boolean | null)[] = [];
    const restrictThumbnail = filters?.restrictThumbnail !== false;

    if (filters?.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
      if (filters.status === 'published' && restrictThumbnail) sql += HAS_BODY_AND_IMAGE;
    }

    if (filters?.source === 'rss') {
      sql += ' AND id IN (SELECT post_id FROM rss_feed_items WHERE post_id IS NOT NULL)';
    } else if (filters?.source === 'manual') {
      sql += ' AND id NOT IN (SELECT post_id FROM rss_feed_items WHERE post_id IS NOT NULL)';
    }

    if (filters?.featured !== undefined) {
      sql += ' AND featured = ?';
      params.push(filters.featured ? 1 : 0);
    }

    if (filters?.search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR slug LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const result = await queryOne<{ count: number | bigint }>(sql, params);
    // Convert BigInt to Number (MariaDB COUNT() returns BigInt)
    const count = result?.count;
    return count ? Number(count) : 0;
  }

  /**
   * Find post by ID
   */
  async findById(id: number): Promise<PostEntity | null> {
    return queryOne<PostEntity>('SELECT * FROM posts WHERE id = ?', [id]);
  }

  /**
   * Find post by slug
   */
  async findBySlug(slug: string): Promise<PostEntity | null> {
    return queryOne<PostEntity>('SELECT * FROM posts WHERE slug = ?', [slug]);
  }

  /**
   * Get original article URL for a post (from rss_feed_items when post came from RSS).
   */
  async getSourceLinkByPostId(postId: number): Promise<string | null> {
    const row = await queryOne<{ link: string }>(
      'SELECT link FROM rss_feed_items WHERE post_id = ? AND link IS NOT NULL AND link != "" LIMIT 1',
      [postId]
    );
    return row?.link?.trim() ?? null;
  }

  /**
   * Find posts by category slug (with join)
   */
  async findByCategorySlug(categorySlug: string, limit?: number): Promise<PostEntity[]> {
    // Replace ALL occurrences (not just first) to properly prefix columns with table alias
    const filterClause = HAS_BODY_AND_IMAGE
      .replace(/content/g, 'p.content')
      .replace(/featured_image_url/g, 'p.featured_image_url');
    
    let sql = `
      SELECT p.* FROM posts p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ? AND p.status = 'published'${filterClause}
      ORDER BY p.id DESC
    `;
    const params: (string | number)[] = [categorySlug];

    if (limit) {
      sql += ' LIMIT ?';
      params.push(limit);
    }

    return query<PostEntity>(sql, params);
  }

  /**
   * Find featured posts (legacy: by featured flag)
   */
  async findFeatured(limit: number = 5): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE featured = 1 AND status = 'published'${HAS_BODY_AND_IMAGE}
       ORDER BY id DESC
       LIMIT ?`,
      [limit]
    );
  }

  /**
   * Find latest posts from all categories (for "Latest News" / featured section)
   */
  async findLatest(limit: number): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE status = 'published'${HAS_BODY_AND_IMAGE}
       ORDER BY id DESC
       LIMIT ?`,
      [limit]
    );
  }

  /**
   * Find latest published posts without requiring S3 thumbnail (for Latest News listing).
   * entityToPost will still derive image from content when featured_image_url is empty,
   * so onlyPostsWithImage can include posts that have image only in content.
   */
  async findLatestForListing(limit: number): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE status = 'published'${HAS_BODY_AND_IMAGE}
       ORDER BY id DESC
       LIMIT ?`,
      [limit]
    );
  }

  /**
   * Find latest posts excluding given IDs (for "More News" after featured)
   */
  async findLatestExcluding(limit: number, excludeIds: number[]): Promise<PostEntity[]> {
    if (excludeIds.length === 0) {
      return this.findLatest(limit);
    }
    const placeholders = excludeIds.map(() => '?').join(',');
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE status = 'published'${HAS_BODY_AND_IMAGE} AND id NOT IN (${placeholders})
       ORDER BY id DESC
       LIMIT ?`,
      [...excludeIds, limit]
    );
  }

  /**
   * Find latest post slugs excluding given IDs (optimized for performance).
   * Returns only slugs to minimize payload size.
   */
  async findLatestSlugsExcluding(limit: number, excludeIds: number[]): Promise<{ slug: string }[]> {
    if (excludeIds.length === 0) {
      return query<{ slug: string }>(
        `SELECT slug FROM posts 
         WHERE status = 'published'${HAS_BODY_AND_IMAGE}
         ORDER BY id DESC
         LIMIT ?`,
        [limit]
      );
    }
    const placeholders = excludeIds.map(() => '?').join(',');
    return query<{ slug: string }>(
      `SELECT slug FROM posts 
       WHERE status = 'published'${HAS_BODY_AND_IMAGE} AND id NOT IN (${placeholders})
       ORDER BY id DESC
       LIMIT ?`,
      [...excludeIds, limit]
    );
  }

  /**
   * Find previous/next post neighbors by id (newest-first ordering).
   */
  async findPrevNextBySlug(currentSlug: string): Promise<{ prev: PostEntity | null; next: PostEntity | null }> {
    const current = await this.findBySlug(currentSlug);
    if (!current || current.status !== 'published') {
      return { prev: null, next: null };
    }

    const prev = await queryOne<PostEntity>(
      `SELECT * FROM posts WHERE status = 'published'${HAS_BODY_AND_IMAGE} AND id < ? ORDER BY id DESC LIMIT 1`,
      [current.id]
    );
    const next = await queryOne<PostEntity>(
      `SELECT * FROM posts WHERE status = 'published'${HAS_BODY_AND_IMAGE} AND id > ? ORDER BY id ASC LIMIT 1`,
      [current.id]
    );

    return { prev: prev ?? null, next: next ?? null };
  }

  /**
   * Find trending posts
   */
  async findTrending(limit: number = 5, excludeIds: number[] = []): Promise<PostEntity[]> {
    let sql = `
      SELECT * FROM posts 
      WHERE status = 'published'${HAS_BODY_AND_IMAGE}
    `;
    const params: number[] = [];

    if (excludeIds.length > 0) {
      sql += ` AND id NOT IN (${excludeIds.map(() => '?').join(',')})`;
      params.push(...excludeIds);
    }

    sql += ` ORDER BY trending_score DESC, id DESC LIMIT ?`;
    params.push(limit);

    return query<PostEntity>(sql, params);
  }

  /**
   * Search posts
   */
  async search(queryText: string, limit: number = 20): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE status = 'published'${HAS_BODY_AND_IMAGE}
       AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)
       ORDER BY id DESC
       LIMIT ?`,
      [`%${queryText}%`, `%${queryText}%`, `%${queryText}%`, limit]
    );
  }

  /**
   * Create new post
   */
  async create(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: number;
    authorId: number;
    featuredImageUrl?: string;
    featuredImageSmallUrl?: string;
    format?: string;
    status?: string;
    featured?: boolean;
  }): Promise<PostEntity> {
    const status = data.status || 'draft';
    const sql = `
      INSERT INTO posts (
        title, slug, excerpt, content, category_id, author_id,
        featured_image_url, featured_image_small_url, format, status, featured, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.categoryId,
      data.authorId,
      data.featuredImageUrl || null,
      data.featuredImageSmallUrl || null,
      data.format || 'standard',
      status,
      data.featured ? 1 : 0,
      status === 'published' ? new Date() : null,
    ];

    const conn = await getDbConnection();
    const connection = await conn.getConnection();
    try {
      const result = await connection.query(sql, params) as { insertId?: number };
      const insertId = result.insertId;
      if (!insertId) {
        throw new Error('Failed to get insert ID');
      }
      return this.findById(insertId) as Promise<PostEntity>;
    } finally {
      connection.release();
    }
  }

  /**
   * Update post
   */
  async update(id: number, data: Partial<PostEntity>): Promise<PostEntity> {
    const fields: string[] = [];
    const params: (string | number | boolean | Date | null)[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    });

    if (fields.length === 0) {
      return this.findById(id) as Promise<PostEntity>;
    }

    params.push(id);
    await query(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id) as Promise<PostEntity>;
  }

  /**
   * Delete post
   */
  async delete(id: number): Promise<void> {
    await query('DELETE FROM posts WHERE id = ?', [id]);
  }

  /**
   * Increment view count
   */
  async incrementViewCount(id: number): Promise<void> {
    await query('UPDATE posts SET view_count = view_count + 1 WHERE id = ?', [id]);
  }
}

