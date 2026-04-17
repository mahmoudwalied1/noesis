export type JwtPayload = {
  sub: string;
  email: string;
  roles: string[];
  jti?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
