import { z } from 'zod';

export const userIdParamsSchema = z.object({ id: z.string().min(1) });

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20)
});

export const updateUserSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  isActive: z.boolean().optional()
});

export const updateUserRolesSchema = z.object({
  roles: z.array(z.enum(['Student', 'Admin'])).min(1)
});
