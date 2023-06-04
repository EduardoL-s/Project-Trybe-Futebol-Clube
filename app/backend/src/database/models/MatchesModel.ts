import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  homeTeamId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },

  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeamId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },

  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'matches',
  sequelize: db,
  underscored: true,
  modelName: 'MatchesModel',
  timestamps: false,
});

MatchesModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default MatchesModel;
