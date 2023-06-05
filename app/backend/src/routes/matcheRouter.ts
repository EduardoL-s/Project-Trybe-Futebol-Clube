import { Router } from 'express';
import matcheControllers from '../controllers/matcheControllers';
import { tokenLoginVerify } from '../middlewares/loginMiddlewares';
import teamsMatchVerification from '../middlewares/matchMiddlewares';

const matchRouter = Router();

matchRouter.get('/', matcheControllers.getAll);
matchRouter.patch('/:id/finish', tokenLoginVerify, matcheControllers.finishMatch);
matchRouter.patch('/:id', tokenLoginVerify, matcheControllers.updatedMatch);
matchRouter.post('/', tokenLoginVerify, teamsMatchVerification, matcheControllers.createMatch);

export default matchRouter;
