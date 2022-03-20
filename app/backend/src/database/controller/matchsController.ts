import { Request, Response } from 'express';
import matchsService from '../services/matchsService';
import StatusCode from '../Utils/StatusCode';

const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    let result;
    if (req.query) {
      result = await matchsService.getByQuery(Boolean(req.query.inProgress));
      return res.status(StatusCode.OK).json(result);
    }
    result = await matchsService.getAll();
    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ error: `${err}` });
  }
};

export default { getAll };
