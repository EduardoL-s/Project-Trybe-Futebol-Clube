import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

async function getAll(req: Request, res: Response) {
  const result = await leaderboardService.getAll();
  return res.status(200).json(result);
}

export default { getAll };
