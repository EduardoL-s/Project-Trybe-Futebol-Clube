import TeamModel from "src/database/models/TeamModel";

async function getAll() {
  const teams = await TeamModel.getAll();
  return teams;
};

export default { getAll };
