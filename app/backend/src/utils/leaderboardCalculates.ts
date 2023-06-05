interface leaderboardForm {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

function calculateAllData(homeBoard: leaderboardForm, awayBoard: leaderboardForm) {
  const totalGoalsFavor = homeBoard.goalsFavor + awayBoard.goalsFavor;
  const totalGoalsOwn = homeBoard.goalsOwn + awayBoard.goalsOwn;
  const totalBalance = totalGoalsFavor - totalGoalsOwn;

  const P = homeBoard.totalPoints + awayBoard.totalPoints;
  const J = homeBoard.totalGames + awayBoard.totalGames;

  const porcentagem = (P / (J * 3)) * 100;

  return {
    name: homeBoard.name,
    totalPoints: homeBoard.totalPoints + awayBoard.totalPoints,
    totalGames: homeBoard.totalGames + awayBoard.totalGames,
    totalVictories: homeBoard.totalVictories + awayBoard.totalVictories,
    totalDraws: homeBoard.totalDraws + awayBoard.totalDraws,
    totalLosses: homeBoard.totalLosses + awayBoard.totalLosses,
    goalsFavor: homeBoard.goalsFavor + awayBoard.goalsFavor,
    goalsOwn: homeBoard.goalsOwn + awayBoard.goalsOwn,
    goalsBalance: totalBalance,
    efficiency: porcentagem.toFixed(2),
  };
}

export default calculateAllData;
