import type { RequestHandler } from 'express';
import { AppError } from '../lib/errors';

export function authorize(...roles: string[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) return next(new AppError(401, 'UNAUTHENTICATED', 'Authentication required'));
    const hasRole = req.user.roles.some((role) => roles.includes(role.name));
    if (!hasRole) return next(new AppError(403, 'FORBIDDEN', 'Insufficient permissions'));
    return next();
  };
}
