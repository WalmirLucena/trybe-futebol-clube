import { Model, DataTypes } from 'sequelize';
import db from './index';
/* import Clubs from './Clubs'; */

class Matchs extends Model {
  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  homeTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
  underscored: true,
});

/* Matchs.hasOne(Clubs, { foreignKey: 'homeTeam', as: 'clubs' });
Matchs.hasOne(Clubs, { foreignKey: 'awayTeam', as: 'clubs' }); */

export default Matchs;
