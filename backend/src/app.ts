import express from 'express';
import { openApiRouter } from './docs/openapi';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiRateLimit } from './middleware/rateLimit';
import { requestId } from './middleware/requestId';
import { requestLogger } from './middleware/requestLogger';
import { applySecurityMiddleware } from './middleware/security';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();

  applySecurityMiddleware(app);
  app.use(requestId);
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use('/api', apiRateLimit);

  app.use('/api/v1', openApiRouter);
  app.use('/api/v1', apiRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export const app = createApp();
