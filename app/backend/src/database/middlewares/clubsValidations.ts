import { NextFunction, Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';

const equalTeams = (req:Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default equalTeams;
