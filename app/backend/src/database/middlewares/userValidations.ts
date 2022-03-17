import { NextFunction, Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';

const validateUser = (req:Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validateUser;
