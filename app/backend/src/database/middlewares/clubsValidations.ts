import { NextFunction, Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';
import { verifyToken } from '../Utils/utilsJWT';

const validateClubs = (req:Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

const validateMatchsToken = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    await verifyToken(String(authorization));

    next();
  } catch (error) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: 'Invalid Token' });
  }
};

export { validateClubs, validateMatchsToken };
