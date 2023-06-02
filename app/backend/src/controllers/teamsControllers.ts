import { Request, Response } from 'express';
import teamsService from 'src/services/teamsService';

async function getAll(req: Request, res: Response) {
  const result = await teamsService.getAll();
  return res.status(200).json(result);
}

export default { getAll };
