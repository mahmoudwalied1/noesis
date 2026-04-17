import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../src/app';
import { integrationEnabled, requireIntegrationServices } from '../helpers/integration';

describe.skipIf(!integrationEnabled)('auth integration', () => {
  requireIntegrationServices();

  it('registers, reads profile, refreshes, and logs out with real database state', async () => {
    const email = `student-${Date.now()}@noesis.local`;

    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ email, password: 'Password123', displayName: 'Integration Student' });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.tokens.accessToken).toBeTruthy();

    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('authorization', `Bearer ${registerRes.body.tokens.accessToken}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.email).toBe(email);

    const refreshRes = await request(app)
      .post('/api/v1/auth/refresh')
      .send({ refreshToken: registerRes.body.tokens.refreshToken });

    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.tokens.refreshToken).toBeTruthy();

    const logoutRes = await request(app)
      .post('/api/v1/auth/logout')
      .send({ refreshToken: refreshRes.body.tokens.refreshToken });

    expect(logoutRes.status).toBe(204);
  });
});
