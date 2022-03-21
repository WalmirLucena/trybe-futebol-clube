import { Request, Response } from 'express';
import matchsService from '../services/matchsService';
import StatusCode from '../Utils/StatusCode';

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
    const result = await matchsService.create(req.body);
    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ error: `${err}` });
  }
};

export default { getAll, create };
