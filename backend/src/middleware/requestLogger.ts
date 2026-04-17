import pinoHttp from 'pino-http';
import crypto from 'node:crypto';
import { logger } from '../lib/logger';

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req) => (req as typeof req & { requestId?: string }).requestId ?? crypto.randomUUID()
});
