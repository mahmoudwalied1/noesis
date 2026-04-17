import cors from 'cors';
import helmet from 'helmet';
import type { Express } from 'express';
import { appConfig } from '../config/app';

export function applySecurityMiddleware(app: Express) {
  app.use(helmet());
  app.use(cors({ origin: appConfig.corsOrigin, credentials: true }));
}
