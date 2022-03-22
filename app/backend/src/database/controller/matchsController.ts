import { Request, Response, NextFunction } from 'express';
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

const findClubs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { awayTeam, homeTeam } = req.body;
    const result = await matchsService.findClubs(homeTeam, awayTeam);
    if (!result) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  } catch (err) {
    return res.status(StatusCode.NOT_FOUND)
      .json({ error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { newMatch } = await matchsService.create(req.body);

    return res.status(StatusCode.CREATED).json(newMatch);
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

export default { getAll, create, finishMatch, findClubs };
