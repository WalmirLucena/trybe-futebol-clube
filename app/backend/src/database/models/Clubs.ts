import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
  underscored: true,
});

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'home_team' });
Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'away_team' });

export default Clubs;
