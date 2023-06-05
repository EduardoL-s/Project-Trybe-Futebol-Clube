import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import {
  calculateTotalPoints,
  calculateTotalVictories,
  calculateTotalLosses,
  calculateTotalDraws,
  calculateGoalsFavor,
  calculateGoalsOwn,
  calculateGoalsBalance,
  calculateEfficiency,
} from '../utils/leaderboardAwayCalculates';

async function allLeaderboards() {
  const matchesFinished = await MatchesModel.findAll({ where: { inProgress: false } });
  const allteams = await TeamModel.findAll();

  const matchesInOrder = allteams.map((team) => {
    const arrayMatches = matchesFinished.filter((match) => match.awayTeamId === team.id);
    return {
      name: team.teamName,
      totalPoints: calculateTotalPoints(arrayMatches),
      totalGames: arrayMatches.length,
      totalVictories: calculateTotalVictories(arrayMatches),
      totalDraws: calculateTotalDraws(arrayMatches),
      totalLosses: calculateTotalLosses(arrayMatches),
      goalsFavor: calculateGoalsFavor(arrayMatches),
      goalsOwn: calculateGoalsOwn(arrayMatches),
      goalsBalance: calculateGoalsBalance(arrayMatches),
      efficiency: calculateEfficiency(arrayMatches),
    };
  });

  return matchesInOrder;
}

async function getAll() {
  const leaderboards = await allLeaderboards();
  // solução para ordenação do array disponível em: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  leaderboards.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return leaderboards;
}

export default { getAll };
