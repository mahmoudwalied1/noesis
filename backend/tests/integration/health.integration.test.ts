import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/app';
import { integrationEnabled, requireIntegrationServices } from '../helpers/integration';

describe.skipIf(!integrationEnabled)('health integration', () => {
  requireIntegrationServices();

  it('returns ready with real PostgreSQL and Redis services', async () => {
    const res = await request(app).get('/api/v1/health/ready');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ready');
    expect(res.body.checks.database).toBe('ok');
    expect(res.body.checks.redis).toBe('ok');
  });
});
