import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'teams',
  sequelize: db,
  underscored: true,
  modelName: 'TeamModel',
  timestamps: false,
});

export default TeamModel;
