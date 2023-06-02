import TeamModel from '../database/models/TeamModel';

async function getAll() {
  const teams = await TeamModel.findAll();
  return teams;
}

async function findById(id: number) {
  const team = await TeamModel.findOne({ where: { id } });
  return team;
}

export default { getAll, findById };
