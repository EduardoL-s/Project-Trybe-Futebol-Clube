import { Router } from 'express';
import loginControllers from '../controllers/loginControllers';
import { bodyLoginVerify } from '../middlewares/loginMiddlewares';

const loginRouter = Router();

loginRouter.post('/', bodyLoginVerify, loginControllers.login);
loginRouter.get('/role', loginControllers.loginPage);

export default loginRouter;
