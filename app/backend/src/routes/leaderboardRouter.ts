import { Router } from 'express';
import leaderboardControllers from '../controllers/leaderboardControllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardControllers.getAll);

export default leaderboardRouter;
