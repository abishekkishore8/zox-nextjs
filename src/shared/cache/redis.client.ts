import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  const url = process.env.REDIS_URL || 'redis://localhost:6382';
  redisClient = createClient({ url });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

export async function closeRedisClient(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}

// Cache helper functions
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

export async function setCache(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  try {
    const client = await getRedisClient();
    const stringValue = JSON.stringify(value);
    if (ttlSeconds) {
      await client.setEx(key, ttlSeconds, stringValue);
    } else {
      await client.set(key, stringValue);
    }
  } catch (error) {
    console.error('Redis set error:', error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Redis delete error:', error);
  }
}

