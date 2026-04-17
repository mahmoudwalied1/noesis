import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import * as controller from './auth.controller';
import { loginSchema, logoutSchema, refreshSchema, registerSchema, updateProfileSchema } from './auth.schemas';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), controller.register);
authRouter.post('/login', validate({ body: loginSchema }), controller.login);
authRouter.post('/refresh', validate({ body: refreshSchema }), controller.refresh);
authRouter.post('/logout', validate({ body: logoutSchema }), controller.logout);
authRouter.get('/me', authenticate, controller.me);
authRouter.patch('/me', authenticate, validate({ body: updateProfileSchema }), controller.updateProfile);
