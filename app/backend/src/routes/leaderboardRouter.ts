import { Router } from 'express';
import leaderboardControllers from '../controllers/leaderboardControllers';

const leaderboardHomeRouter = Router();

leaderboardHomeRouter.get('/home', leaderboardControllers.getAllHome);
leaderboardHomeRouter.get('/away', leaderboardControllers.getAllAway);

export default leaderboardHomeRouter;
