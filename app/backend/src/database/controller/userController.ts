import { Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';
import userService from '../services/userService';

const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.login(req.body);

    if (!result) {
      return res.status(StatusCode.UNAUTHORIZED).send({ message: 'Incorrect email or password' });
    }

    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: `error ${err}` });
  }
};

export default login;
