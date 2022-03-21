import IMatchs from '../interfaces/matchsInterface';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

const getByQuery = async (query: boolean) => {
  const matchs = await Matchs.findAll({
    where: { inProgress: query },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });

  return matchs;
};

const getAll = async () => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });
  return matchs;
};

const create = async (data: IMatchs) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;
  const newMatch = await Matchs.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
  return newMatch;
};

export default { getAll, getByQuery, create };
