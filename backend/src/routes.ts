import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes';
import { contentRouter } from './modules/content/content.routes';
import { documentsRouter } from './modules/documents/documents.routes';
import { healthRouter } from './modules/health/health.routes';
import { usersRouter } from './modules/users/users.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/', contentRouter);
apiRouter.use('/documents', documentsRouter);
