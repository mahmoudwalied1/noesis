import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { AppError, isAppError } from '../lib/errors';
import { logger } from '../lib/logger';

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: error.issues,
        requestId: req.requestId
      }
    });
    return;
  }

  const structuralError = error as Partial<AppError>;
  const appError = isAppError(error)
    ? error
    : typeof structuralError.statusCode === 'number' &&
        typeof structuralError.code === 'string' &&
        error instanceof Error
      ? new AppError(structuralError.statusCode, structuralError.code, error.message, structuralError.details)
      : new AppError(500, 'INTERNAL_SERVER_ERROR', 'Internal server error');

  if (!isAppError(error)) {
    logger.error({ error }, 'Unhandled request error');
  }

  res.status(appError.statusCode).json({
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details,
      requestId: req.requestId,
      stack: env.NODE_ENV === 'production' ? undefined : error instanceof Error ? error.stack : undefined
    }
  });
};
