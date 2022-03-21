import { Request, Response } from 'express';
import matchsService from '../services/matchsService';
import StatusCode from '../Utils/StatusCode';
import { verifyToken } from '../Utils/utilsJWT';

const getByQuery = async (req: Request, res: Response, inProgress: string) => {
  let query;

  if (inProgress === 'true') query = true;
  else query = false;

  const result = await matchsService.getByQuery(query);

  return res.status(StatusCode.OK).json(result);
};

const getAll = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    if (!inProgress) {
      const result = await matchsService.getAll();
      return res.status(StatusCode.OK).json(result);
    }

    getByQuery(req, res, String(inProgress));
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const decoded = await verifyToken(String(authorization));

    if (!decoded) throw new Error();

    const { newMatch, message } = await matchsService.create(req.body);

    if (message) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message });
    }

    return res.status(StatusCode.OK).json(newMatch);
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ message: 'Token invalid' });
  }
};

const finishMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { updateMatch, message } = await matchsService.finishMatch(+id);

    if (message) return res.status(StatusCode.NOT_FOUND).send({ message });

    return res.status(StatusCode.OK).json(updateMatch);
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ error: `${err}` });
  }
};

export default { getAll, create, finishMatch };
