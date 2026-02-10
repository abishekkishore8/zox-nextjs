import { query, queryOne, getDbConnection } from '@/shared/database/connection';
import { PostEntity } from '../domain/types';

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
  }): Promise<PostEntity[]> {
    let sql = 'SELECT * FROM posts WHERE 1=1';
    const params: (string | number | boolean | null)[] = [];

    if (filters?.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
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

    sql += ' ORDER BY published_at DESC, created_at DESC';

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
  }): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM posts WHERE 1=1';
    const params: (string | number | boolean | null)[] = [];

    if (filters?.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
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
   * Find posts by category slug (with join)
   */
  async findByCategorySlug(categorySlug: string, limit?: number): Promise<PostEntity[]> {
    let sql = `
      SELECT p.* FROM posts p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ? AND p.status = 'published'
      ORDER BY p.published_at DESC, p.created_at DESC
    `;
    const params: (string | number)[] = [categorySlug];

    if (limit) {
      sql += ' LIMIT ?';
      params.push(limit);
    }

    return query<PostEntity>(sql, params);
  }

  /**
   * Find featured posts
   */
  async findFeatured(limit: number = 5): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE featured = 1 AND status = 'published'
       ORDER BY published_at DESC, created_at DESC
       LIMIT ?`,
      [limit]
    );
  }

  /**
   * Find trending posts
   */
  async findTrending(limit: number = 5, excludeIds: number[] = []): Promise<PostEntity[]> {
    let sql = `
      SELECT * FROM posts 
      WHERE status = 'published'
    `;
    const params: number[] = [];

    if (excludeIds.length > 0) {
      sql += ` AND id NOT IN (${excludeIds.map(() => '?').join(',')})`;
      params.push(...excludeIds);
    }

    sql += ` ORDER BY trending_score DESC, published_at DESC LIMIT ?`;
    params.push(limit);

    return query<PostEntity>(sql, params);
  }

  /**
   * Search posts
   */
  async search(queryText: string, limit: number = 20): Promise<PostEntity[]> {
    return query<PostEntity>(
      `SELECT * FROM posts 
       WHERE status = 'published' 
       AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)
       ORDER BY published_at DESC
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
      data.status || 'draft',
      data.featured ? 1 : 0,
      data.status === 'published' ? new Date() : null,
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

