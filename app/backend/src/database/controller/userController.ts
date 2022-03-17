import { Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';
import * as UserService from '../services/userService';

const login = async (req: Request, res: Response) => {
  try {
    const result = await UserService.default(req.body);

    if (!result) {
      return res.status(StatusCode.UNAUTHORIZED).send({ message: 'Incorrect email or password' });
    }

    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: 'Username or password invalid' });
  }
};

export default login;
