import { IMatchs } from '../interfaces/matchsInterface';
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

const findClubs = async (team:number) => {
  const clubExists = await Clubs.findOne({
    where: {
      id: team,
    } });
  return clubExists;
};

const create = async (data: IMatchs) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

  if (homeTeam === awayTeam) {
    return (
      { message: 'It is not possible to create a match with two equal teams' });
  }

  const checkHomeTeam = await findClubs(homeTeam);
  const checkAwayTeam = await findClubs(awayTeam);

  if (!checkAwayTeam || !checkHomeTeam) return ({ message: 'Team not found' });

  const newMatch = await Matchs.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

  return { newMatch };
};

const getById = async (id:number) => {
  const match = await Matchs.findOne({ where: { id } });
  return match;
};

const finishMatch = async (id:number) => {
  const match = await getById(id);

  if (!match) return ({ message: 'No matches found with this id' });

  await Matchs.update({ inProgress: false }, {
    where: {
      id,
    } });

  const updateMatch = await getById(id);

  return { updateMatch };
};

export default { getAll, getByQuery, create, finishMatch };
