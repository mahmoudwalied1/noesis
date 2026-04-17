import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import {
  hashPassword,
  hashRefreshToken,
  refreshTokenExpiry,
  signAccessToken,
  signRefreshToken,
  verifyPassword,
  verifyRefreshToken
} from './auth.utils';

function sanitizeUser<T extends { passwordHash?: string }>(user: T) {
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return safeUser;
}

function createTokens(user: { id: string; email: string; roles: { name: string }[] }) {
  const payload = {
    sub: user.id,
    email: user.email,
    roles: user.roles.map((role) => role.name)
  };

  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload)
  };
}

async function storeRefreshToken(userId: string, refreshToken: string) {
  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: refreshTokenExpiry()
    }
  });
}

export async function register(input: { email: string; password: string; displayName: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'Email is already registered');

  const studentRole = await prisma.role.findUnique({ where: { name: 'Student' } });
  if (!studentRole) throw new AppError(500, 'ROLE_MISSING', 'Student role is not seeded');

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      displayName: input.displayName,
      passwordHash: await hashPassword(input.password),
      roles: { connect: { id: studentRole.id } }
    },
    include: { roles: true }
  });

  const tokens = createTokens(user);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return { user: sanitizeUser(user), tokens };
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    include: { roles: true }
  });

  if (!user || !user.isActive || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const tokens = createTokens(user);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return { user: sanitizeUser(user), tokens };
}

export async function refresh(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashRefreshToken(refreshToken);
  const storedToken = await prisma.refreshToken.findUnique({ where: { tokenHash } });

  if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
    throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid');
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    include: { roles: true }
  });
  if (!user || !user.isActive) throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid');

  await prisma.refreshToken.update({
    where: { id: storedToken.id },
    data: { revokedAt: new Date() }
  });

  const tokens = createTokens(user);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return { user: sanitizeUser(user), tokens };
}

export async function logout(refreshToken: string) {
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashRefreshToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() }
  });
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { roles: true }
  });
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
  return sanitizeUser(user);
}

export async function updateProfile(
  userId: string,
  input: { displayName?: string; avatarUrl?: string | null; bio?: string | null }
) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: input,
    include: { roles: true }
  });
  return sanitizeUser(user);
}
