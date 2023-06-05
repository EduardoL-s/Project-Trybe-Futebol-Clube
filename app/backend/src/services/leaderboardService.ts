import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import {
  calculateTotalPoints,
  calculateTotalVictories,
  calculateTotalLosses,
  calculateTotalDraws,
  calculateTotalGoalsFavor,
  calculateTotalGoalsOwn,
} from '../utils/leaderboardCalculates';

async function getAll() {
  const matchesFinished = await MatchesModel.findAll({ where: { inProgress: false } });

  const allteams = await TeamModel.findAll();

  const matchesInOrder = allteams.map((team) => {
    const arrayMatches = matchesFinished.filter((match) => match.homeTeamId === team.id);
    return {
      name: team.teamName,
      totalPoints: calculateTotalPoints(arrayMatches),
      totalGames: arrayMatches.length,
      totalVictories: calculateTotalVictories(arrayMatches),
      totalDraws: calculateTotalDraws(arrayMatches),
      totalLosses: calculateTotalLosses(arrayMatches),
      goalsFavor: calculateTotalGoalsFavor(arrayMatches),
      goalsOwn: calculateTotalGoalsOwn(arrayMatches),
    };
  });

  return matchesInOrder;
}

export default { getAll };
