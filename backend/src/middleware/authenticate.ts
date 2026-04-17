import type { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../lib/errors';
import { verifyAccessToken } from '../modules/auth/auth.utils';

export const authenticate: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.header('authorization');
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new AppError(401, 'UNAUTHENTICATED', 'Authentication required');

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        displayName: true,
        isActive: true,
        roles: { select: { id: true, name: true } }
      }
    });

    if (!user || !user.isActive) throw new AppError(401, 'UNAUTHENTICATED', 'Authentication required');

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(401, 'UNAUTHENTICATED', 'Authentication required'));
  }
};
