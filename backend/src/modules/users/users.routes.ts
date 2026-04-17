import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import * as controller from './users.controller';
import { listUsersQuerySchema, updateUserRolesSchema, updateUserSchema, userIdParamsSchema } from './users.schemas';

export const usersRouter = Router();

usersRouter.use(authenticate, authorize('Admin'));
usersRouter.get('/', validate({ query: listUsersQuerySchema }), controller.listUsers);
usersRouter.get('/:id', validate({ params: userIdParamsSchema }), controller.getUser);
usersRouter.patch('/:id', validate({ params: userIdParamsSchema, body: updateUserSchema }), controller.updateUser);
usersRouter.patch(
  '/:id/roles',
  validate({ params: userIdParamsSchema, body: updateUserRolesSchema }),
  controller.updateUserRoles
);
