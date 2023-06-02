import { Router } from 'express';
import loginControllers from '../controllers/loginControllers';
import { bodyLoginVerify, tokenLoginVerify } from '../middlewares/loginMiddlewares';

const loginRouter = Router();

loginRouter.post('/', bodyLoginVerify, loginControllers.login);
loginRouter.get('/role', tokenLoginVerify, loginControllers.loginPage);

export default loginRouter;
