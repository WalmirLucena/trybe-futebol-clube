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

Matchs.belongsTo(Clubs, { foreignKey: 'home_team', targetKey: 'id', as: 'homeClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'away_team', targetKey: 'id', as: 'awayClub' });

Clubs.hasMany(Matchs, { foreignKey: 'home_team', as: 'matchHome' });
Clubs.hasMany(Matchs, { foreignKey: 'away_team', as: 'matchAway' });

export default Clubs;
