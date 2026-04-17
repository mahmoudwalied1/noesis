import express, { type Router } from 'express';
import { errorHandler } from '../../src/middleware/errorHandler';
import { notFound } from '../../src/middleware/notFound';

export function createRouteTestApp(path: string, router: Router) {
  const app = express();
  app.use(express.json());
  app.use(path, router);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
