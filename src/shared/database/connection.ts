import mariadb from 'mariadb';

let pool: mariadb.Pool | null = null;

export async function getDbConnection(): Promise<mariadb.Pool> {
  if (pool) {
    return pool;
  }

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'zox_user',
    password: process.env.DB_PASSWORD || 'zox_password',
    database: process.env.DB_NAME || 'zox_db',
    connectionLimit: 10,
    acquireTimeout: 30000,
    timeout: 30000,
  };

  pool = mariadb.createPool(config);
  return pool;
}

export async function closeDbConnection(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Helper function to execute queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const conn = await getDbConnection();
  const connection = await conn.getConnection();
  try {
    const result = await connection.query(sql, params);
    return result as T[];
  } finally {
    connection.release();
  }
}

// Helper function for single row queries
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

