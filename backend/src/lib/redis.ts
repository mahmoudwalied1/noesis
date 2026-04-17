import IORedis from 'ioredis';
import { env } from '../config/env';
import { logger } from './logger';

const globalForRedis = globalThis as unknown as { redis?: IORedis };

export const redis =
  globalForRedis.redis ??
  new IORedis(env.REDIS_URL, {
    maxRetriesPerRequest: null
  });

redis.on('error', (error) => logger.error({ error }, 'Redis connection error'));

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}
