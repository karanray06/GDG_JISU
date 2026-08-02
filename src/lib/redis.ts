import { createClient, RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redisClient: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!redisClient) {
    redisClient = createClient({
      url: REDIS_URL,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    await redisClient.connect();
  }

  return redisClient;
};

// Simple wrapper for caching logic
export const cacheSet = async (key: string, value: any, ttlSeconds: number = 3600) => {
  try {
    const client = await getRedisClient();
    await client.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  } catch (err) {
    console.error('Redis Cache Set Error:', err);
  }
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  try {
    const client = await getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Redis Cache Get Error:', err);
    return null;
  }
};
