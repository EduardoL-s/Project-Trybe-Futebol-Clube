import { Router } from 'express';
import matcheControllers from '../controllers/matcheControllers';

const matchRouter = Router();

matchRouter.get('/', matcheControllers.getAll);

export default matchRouter;
