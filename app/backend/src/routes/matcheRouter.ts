import { Router } from 'express';
import matcheControllers from '../controllers/matcheControllers';
import { tokenLoginVerify } from '../middlewares/loginMiddlewares';

const matchRouter = Router();

matchRouter.get('/', matcheControllers.getAll);
matchRouter.patch('/:id/finish', tokenLoginVerify, matcheControllers.finishMatch);
matchRouter.patch('/:id', tokenLoginVerify, matcheControllers.updatedMatch);

export default matchRouter;
