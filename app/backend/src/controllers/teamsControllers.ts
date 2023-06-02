import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

async function getAll(req: Request, res: Response) {
  const result = await teamsService.getAll();
  return res.status(200).json(result);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await teamsService.findById(+id);
  return res.status(200).json(result);
}

export default { getAll, getById };
