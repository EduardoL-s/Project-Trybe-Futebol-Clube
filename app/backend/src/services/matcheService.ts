import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';

const includeTeam = [
  { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
  { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
];

async function getAll(inProgress: string) {
  if (inProgress === 'true') {
    const matchesInProgress = await MatchesModel.findAll({
      where: { inProgress: true },
      include: includeTeam,
    });
    return matchesInProgress;
  }

  if (inProgress === 'false') {
    const matchesInProgress = await MatchesModel.findAll({
      where: { inProgress: false },
      include: includeTeam,
    });
    return matchesInProgress;
  }

  const matches = await MatchesModel.findAll({
    include: includeTeam,
  });
  return matches;
}

async function finishedMatch(id: number) {
  const match = await MatchesModel.findByPk(id);

  if (match) {
    // solução para utilização do patch encontrado em: https://sequelize.org/docs/v6/core-concepts/model-instances/
    match.inProgress = false;
    await match.save();
  }
}

export default { getAll, finishedMatch };
