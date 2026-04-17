import type { Role, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: Pick<User, 'id' | 'email' | 'displayName' | 'isActive'> & {
        roles: Pick<Role, 'id' | 'name'>[];
      };
    }
  }
}

export {};
