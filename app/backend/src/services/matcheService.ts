import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';

async function getAll() {
  const matches = await MatchesModel.findAll({
    include: [
      { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return matches;
}

export default { getAll };
