import { Router } from 'express';
import { live, ready } from './health.controller';

export const healthRouter = Router();

healthRouter.get('/live', live);
healthRouter.get('/ready', ready);
