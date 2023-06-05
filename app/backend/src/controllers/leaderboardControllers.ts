import { Request, Response } from 'express';
import leaderboardHomeService from '../services/leaderboardHomeService';
import leaderboardAwaySevice from '../services/leaderboardAwaySevice';
import leaderboardService from '../services/leaderboardService';

async function getAllHome(req: Request, res: Response) {
  const result = await leaderboardHomeService.getAll();
  return res.status(200).json(result);
}

async function getAllAway(req: Request, res: Response) {
  const result = await leaderboardAwaySevice.getAll();
  return res.status(200).json(result);
}

async function getAll(req: Request, res: Response) {
  const result = await leaderboardService.getAll();
  return res.status(200).json(result);
}

export default { getAllHome, getAllAway, getAll };
