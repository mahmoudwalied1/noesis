import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../config/auth';
import type { JwtPayload } from './auth.types';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign({ ...payload, jti: crypto.randomUUID() }, authConfig.accessSecret, {
    expiresIn: authConfig.accessTokenTtl
  } as jwt.SignOptions);
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign({ ...payload, jti: crypto.randomUUID() }, authConfig.refreshSecret, {
    expiresIn: authConfig.refreshTokenTtl
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, authConfig.accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, authConfig.refreshSecret) as JwtPayload;
}

export function hashRefreshToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function refreshTokenExpiry() {
  const ttl = authConfig.refreshTokenTtl;
  const match = /^(\d+)([smhd])$/.exec(ttl);
  const now = Date.now();

  if (!match) return new Date(now + 7 * 24 * 60 * 60 * 1000);

  const amount = Number(match[1]);
  const unit = match[2];
  const multiplier = unit === 's' ? 1000 : unit === 'm' ? 60000 : unit === 'h' ? 3600000 : 86400000;

  return new Date(now + amount * multiplier);
}
