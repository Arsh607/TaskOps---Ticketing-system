import { Router } from 'express';
import { upsertCurrentUser } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/me', upsertCurrentUser);

export default userRouter;
