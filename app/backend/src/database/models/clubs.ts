import { Model, DataTypes } from 'sequelize';
import db from './';
import matchs from './matchs';

  class clubs extends Model {
    }

  clubs.init({
    club_name: DataTypes.STRING,
  }, {
    sequelize:db,
    modelName: 'clubs',
    timestamps: false,
    underscored: true,
  });

  clubs.hasMany(matchs, {foreignKey: 'home_team', as: 'matchs' });
  clubs.hasMany(matchs, {foreignKey: 'away_team', as: 'matchs' })

export default clubs;