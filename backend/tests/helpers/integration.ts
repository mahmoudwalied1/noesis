import { beforeAll, beforeEach, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { prisma } from '../../src/lib/prisma';
import { redis } from '../../src/lib/redis';

export const integrationEnabled = process.env.RUN_INTEGRATION_TESTS === 'true';

export function requireIntegrationServices() {
  beforeAll(async () => {
    if (!integrationEnabled) return;
    execFileSync('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit', shell: true });
    execFileSync('npm', ['run', 'seed'], { stdio: 'inherit', shell: true });
    await redis.ping();
  });

  beforeEach(async () => {
    if (!integrationEnabled) return;
    await prisma.refreshToken.deleteMany();
  });

  afterAll(async () => {
    if (!integrationEnabled) return;
    await prisma.$disconnect();
    await redis.quit();
  });
}
