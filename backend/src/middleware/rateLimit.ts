import rateLimit from 'express-rate-limit';
import { appConfig } from '../config/app';

export const apiRateLimit = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  limit: appConfig.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests'
    }
  }
});
