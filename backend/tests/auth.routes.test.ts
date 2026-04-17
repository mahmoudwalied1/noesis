import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/modules/auth/auth.service', () => ({
  register: vi.fn(),
  login: vi.fn(),
  refresh: vi.fn(),
  logout: vi.fn(),
  me: vi.fn(),
  updateProfile: vi.fn()
}));

vi.mock('../src/middleware/authenticate', () => ({
  authenticate: (req: any, _res: any, next: any) => {
    if (req.header('authorization') === 'Bearer valid-token') {
      req.user = {
        id: 'user_1',
        email: 'student@noesis.local',
        displayName: 'Student',
        isActive: true,
        roles: [{ id: 'role_1', name: 'Student' }]
      };
      return next();
    }
    const error = new Error('Authentication required') as Error & { statusCode: number; code: string };
    error.statusCode = 401;
    error.code = 'UNAUTHENTICATED';
    return next(error);
  }
}));

import * as authService from '../src/modules/auth/auth.service';
import { authRouter } from '../src/modules/auth/auth.routes';
import { createRouteTestApp } from './helpers/testApp';

const app = createRouteTestApp('/auth', authRouter);

describe('auth routes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('registers a user', async () => {
    vi.mocked(authService.register).mockResolvedValue({
      user: { id: 'user_1', email: 'student@noesis.local', displayName: 'Student', roles: [] },
      tokens: { accessToken: 'access', refreshToken: 'refresh' }
    } as any);

    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'student@noesis.local', password: 'Password123', displayName: 'Student' });

    expect(res.status).toBe(201);
    expect(res.body.tokens.accessToken).toBe('access');
  });

  it('rejects invalid register payloads', async () => {
    const res = await request(app).post('/auth/register').send({ email: 'bad', password: 'x' });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('logs in a user', async () => {
    vi.mocked(authService.login).mockResolvedValue({
      user: { id: 'user_1', email: 'student@noesis.local', displayName: 'Student', roles: [] },
      tokens: { accessToken: 'access', refreshToken: 'refresh' }
    } as any);

    const res = await request(app).post('/auth/login').send({ email: 'student@noesis.local', password: 'Password123' });

    expect(res.status).toBe(200);
    expect(authService.login).toHaveBeenCalledWith({ email: 'student@noesis.local', password: 'Password123' });
  });

  it('refreshes tokens', async () => {
    vi.mocked(authService.refresh).mockResolvedValue({
      tokens: { accessToken: 'new-access', refreshToken: 'new-refresh' }
    } as any);

    const res = await request(app).post('/auth/refresh').send({ refreshToken: 'refresh' });

    expect(res.status).toBe(200);
    expect(res.body.tokens.accessToken).toBe('new-access');
  });

  it('logs out', async () => {
    vi.mocked(authService.logout).mockResolvedValue(undefined);

    const res = await request(app).post('/auth/logout').send({ refreshToken: 'refresh' });

    expect(res.status).toBe(204);
  });

  it('requires auth for me', async () => {
    const res = await request(app).get('/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('returns me when authenticated', async () => {
    vi.mocked(authService.me).mockResolvedValue({ id: 'user_1', email: 'student@noesis.local' } as any);

    const res = await request(app).get('/auth/me').set('authorization', 'Bearer valid-token');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe('user_1');
  });

  it('updates profile when authenticated', async () => {
    vi.mocked(authService.updateProfile).mockResolvedValue({ id: 'user_1', displayName: 'Updated' } as any);

    const res = await request(app)
      .patch('/auth/me')
      .set('authorization', 'Bearer valid-token')
      .send({ displayName: 'Updated' });

    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe('Updated');
  });
});
