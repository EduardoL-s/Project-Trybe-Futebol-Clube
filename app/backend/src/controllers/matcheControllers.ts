import { Request, Response } from 'express';
import matcheService from '../services/matcheService';

async function getAll(req: Request, res: Response) {
  const { inProgress } = req.query;
  const queryToString = Array.isArray(inProgress) ? inProgress.join(',') : inProgress as string;
  const result = await matcheService.getAll(queryToString);
  return res.status(200).json(result);
}

async function finishMatch(req: Request, res: Response) {
  const { id } = req.params;
  await matcheService.finishedMatch(+id);
  return res.status(200).json({ message: 'Finished' });
}

export default { getAll, finishMatch };
