import Clubs from '../models/Clubs';

const getAll = async () => {
  const clubs = await Clubs.findAll({ raw: true });

  if (!clubs) return false;

  return clubs;
};

const getById = async (id: number) => {
  const club = await Clubs.findOne({ where: { id } });

  if (!club) return false;

  return club;
};

export default { getAll, getById };
