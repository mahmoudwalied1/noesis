import type { RequestHandler } from 'express';
import { getLiveness, getReadiness } from './health.service';

export const live: RequestHandler = async (_req, res, next) => {
  try {
    res.json(await getLiveness());
  } catch (error) {
    next(error);
  }
};

export const ready: RequestHandler = async (_req, res, next) => {
  try {
    const readiness = await getReadiness();
    res.status(readiness.status === 'ready' ? 200 : 503).json(readiness);
  } catch (error) {
    next(error);
  }
};
