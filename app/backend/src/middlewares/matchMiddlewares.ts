import { NextFunction, Request, Response } from 'express';
import teamsService from '../services/teamsService';

async function teamsMatchVerification(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const verifyHomeTeamExist = await teamsService.findById(homeTeamId);
  const verifyAwayTeamExist = await teamsService.findById(awayTeamId);

  if (!verifyHomeTeamExist || !verifyAwayTeamExist) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}

export default teamsMatchVerification;
