import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { loginSchema } from '../schemas/user.schema.js';

export const userRouter = Router();

userRouter.post('/login', validateSchema(loginSchema), userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/verify", verifyToken, userController.obtainUser);
userRouter.post('/register', userController.register);