import calculateAllData from '../utils/leaderboardCalculates';
import leaderboardHomeService from './leaderboardHomeService';
import leaderboardAwaySevice from './leaderboardAwaySevice';

async function allLeaderboards() {
  const home = await leaderboardHomeService.getAll();
  const away = await leaderboardAwaySevice.getAll();

  const array1 = home.map((homeBoard) => {
    const array2 = away.filter((awayBoard) => homeBoard.name === awayBoard.name);
    const total = calculateAllData(homeBoard, array2[0]);
    return total;
  });
  return array1;
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
