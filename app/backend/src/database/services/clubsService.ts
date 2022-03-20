import Clubs from '../models/Clubs';

const getAll = async () => {
  const clubs = await Clubs.findAll();

  if (!clubs) return false;

  return clubs;
};

const getById = async (id: string) => {
  const club = await Clubs.findOne({ where: { id } });

  if (!club) return false;

  return club;
};

export default { getAll, getById };
