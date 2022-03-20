import { Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';
import clubsService from '../services/clubsService';

const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await clubsService.getAll();

    if (!result) {
      return res.status(StatusCode.UNAUTHORIZED).send({ message: 'Clubs list is empty' });
    }

    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: `${err}` });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await clubsService.getById(id);

    if (!result) {
      return res.status(StatusCode.UNAUTHORIZED).send({ message: 'Id not founded' });
    }

    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: `${err}` });
  }
};

export default { getAll, getById };
