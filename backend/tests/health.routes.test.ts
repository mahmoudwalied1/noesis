import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/modules/health/health.service', () => ({
  getLiveness: vi.fn(),
  getReadiness: vi.fn()
}));

import * as healthService from '../src/modules/health/health.service';
import { healthRouter } from '../src/modules/health/health.routes';
import { createRouteTestApp } from './helpers/testApp';

const app = createRouteTestApp('/health', healthRouter);

describe('health routes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns liveness', async () => {
    vi.mocked(healthService.getLiveness).mockResolvedValue({
      status: 'ok',
      service: 'noesis-backend',
      timestamp: new Date().toISOString()
    });

    const res = await request(app).get('/health/live');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns readiness when dependencies are available', async () => {
    vi.mocked(healthService.getReadiness).mockResolvedValue({
      status: 'ready',
      checks: { database: 'ok', redis: 'ok' },
      timestamp: new Date().toISOString()
    });

    const res = await request(app).get('/health/ready');

    expect(res.status).toBe(200);
    expect(res.body.checks.database).toBe('ok');
  });

  it('returns 503 when dependencies are unavailable', async () => {
    vi.mocked(healthService.getReadiness).mockResolvedValue({
      status: 'not_ready',
      checks: { database: 'error', redis: 'ok' },
      timestamp: new Date().toISOString()
    });

    const res = await request(app).get('/health/ready');

    expect(res.status).toBe(503);
    expect(res.body.status).toBe('not_ready');
  });
});
