import { query, queryOne, getDbConnection } from '@/shared/database/connection';
import { EventEntity } from '../domain/types';

export class EventsRepository {
  async findAll(filters?: {
    location?: string;
    status?: string;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<EventEntity[]> {
    let sql = 'SELECT * FROM events WHERE 1=1';
    const params: (string | number)[] = [];

    if (filters?.location) {
      sql += ' AND location = ?';
      params.push(filters.location);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.search) {
      sql += ' AND (title LIKE ? OR slug LIKE ? OR location LIKE ? OR excerpt LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY event_date ASC';

    if (filters?.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    if (filters?.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return query<EventEntity>(sql, params);
  }

  /**
   * Count events with optional filters
   */
  async count(filters?: {
    location?: string;
    status?: string;
    search?: string;
  }): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM events WHERE 1=1';
    const params: (string | number)[] = [];

    if (filters?.location) {
      sql += ' AND location = ?';
      params.push(filters.location);
    }

    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.search) {
      sql += ' AND (title LIKE ? OR slug LIKE ? OR location LIKE ? OR excerpt LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const result = await queryOne<{ count: number | bigint }>(sql, params);
    // Convert BigInt to Number (MariaDB COUNT() returns BigInt)
    const count = result?.count;
    return count ? Number(count) : 0;
  }

  async findById(id: number): Promise<EventEntity | null> {
    return queryOne<EventEntity>('SELECT * FROM events WHERE id = ?', [id]);
  }

  async findBySlug(slug: string): Promise<EventEntity | null> {
    return queryOne<EventEntity>('SELECT * FROM events WHERE slug = ?', [slug]);
  }

  /**
   * Create new event
   */
  async create(data: {
    title: string;
    slug: string;
    excerpt?: string;
    description?: string;
    location: string;
    eventDate: Date;
    eventTime?: string;
    imageUrl?: string;
    externalUrl?: string;
    status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  }): Promise<EventEntity> {
    const sql = `
      INSERT INTO events (
        title, slug, excerpt, description, location, event_date, event_time,
        image_url, external_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.title,
      data.slug,
      data.excerpt || null,
      data.description || null,
      data.location,
      data.eventDate,
      data.eventTime || null,
      data.imageUrl || null,
      data.externalUrl || null,
      data.status || 'upcoming',
    ];

    const conn = await getDbConnection();
    const connection = await conn.getConnection();
    try {
      const result = await connection.query(sql, params) as { insertId?: number };
      const insertId = result.insertId;
      if (!insertId) {
        throw new Error('Failed to get insert ID');
      }
      return this.findById(insertId) as Promise<EventEntity>;
    } finally {
      connection.release();
    }
  }

  /**
   * Update event
   */
  async update(id: number, data: Partial<EventEntity>): Promise<EventEntity> {
    const fields: string[] = [];
    const params: (string | number | Date | null)[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        // Convert camelCase to snake_case for database
        const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbKey} = ?`);
        params.push(value as string | number | Date | null);
      }
    });

    if (fields.length === 0) {
      return this.findById(id) as Promise<EventEntity>;
    }

    params.push(id);
    await query(`UPDATE events SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id) as Promise<EventEntity>;
  }

  /**
   * Delete event
   */
  async delete(id: number): Promise<void> {
    await query('DELETE FROM events WHERE id = ?', [id]);
  }

  /**
   * Check if slug exists
   */
  async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    let sql = 'SELECT COUNT(*) as count FROM events WHERE slug = ?';
    const params: (string | number)[] = [slug];

    if (excludeId) {
      sql += ' AND id != ?';
      params.push(excludeId);
    }

    const result = await queryOne<{ count: number | bigint }>(sql, params);
    // Convert BigInt to Number (MariaDB COUNT() returns BigInt)
    const count = result?.count;
    return count ? Number(count) > 0 : false;
  }
}

