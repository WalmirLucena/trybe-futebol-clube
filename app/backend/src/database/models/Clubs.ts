import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id?: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
  underscored: true,
});

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'matchs' });
/* Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'home_team' }); */

export default Clubs;
