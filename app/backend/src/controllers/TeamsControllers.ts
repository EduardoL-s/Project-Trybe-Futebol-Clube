import { Request, Response } from 'express';
import TeamsService from "src/services/TeamsService";

async function getAll(req: Request, res: Response) {
  const result = await TeamsService.getAll();
  return result.status(200).json(result);
};

export default { getAll };
