import { env } from './env';

export const authConfig = {
  accessSecret: env.JWT_ACCESS_SECRET,
  refreshSecret: env.JWT_REFRESH_SECRET,
  accessTokenTtl: env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: env.REFRESH_TOKEN_TTL
};
