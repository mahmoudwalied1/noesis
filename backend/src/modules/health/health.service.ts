import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';

export async function getLiveness() {
  return {
    status: 'ok',
    service: 'noesis-backend',
    timestamp: new Date().toISOString()
  };
}

export async function getReadiness() {
  const checks: Record<string, 'ok' | 'error'> = {
    database: 'ok',
    redis: 'ok'
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    checks.database = 'error';
  }

  try {
    await redis.ping();
  } catch {
    checks.redis = 'error';
  }

  const ready = Object.values(checks).every((status) => status === 'ok');

  return {
    status: ready ? 'ready' : 'not_ready',
    checks,
    timestamp: new Date().toISOString()
  };
}
