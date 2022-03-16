import { Model, DataTypes } from 'sequelize';
import db from '.';
import clubs from '.';

class matchs extends Model {
  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

matchs.init({
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.STRING,
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

matchs.belongsTo(clubs, { foreignKey: 'home_team', as: 'clubs' });
matchs.belongsTo(clubs, { foreignKey: 'away_team', as: 'clubs' });

export default matchs;
