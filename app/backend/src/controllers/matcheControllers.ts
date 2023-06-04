import { Request, Response } from 'express';
import matcheService from '../services/matcheService';

async function getAll(req: Request, res: Response) {
  const result = await matcheService.getAll();
  return res.status(200).json(result);
}

export default { getAll };
