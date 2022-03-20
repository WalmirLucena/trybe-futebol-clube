import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

const getAll = async () => {
  const matchs = await Matchs.findAll({
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: [['club_name', 'clubName']] },
      { model: Clubs, as: 'homeClub', attributes: [['club_name', 'clubName']] },
    ],
  });
  return matchs;
};

const getByQuery = async (inProgress: boolean) => {
  const matchs = await Matchs.findAll({
    where: { inProgress },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: [['club_name', 'clubName']] },
      { model: Clubs, as: 'homeClub', attributes: [['club_name', 'clubName']] },
    ],
  });

  return matchs;
};
export default { getAll, getByQuery };
