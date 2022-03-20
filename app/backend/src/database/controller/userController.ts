import { Request, Response } from 'express';
import StatusCode from '../Utils/StatusCode';
import userService from '../services/userService';
import { verifyToken } from '../Utils/utilsJWT';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await userService.login(req.body);

    if (!result) {
      return res.status(StatusCode.UNAUTHORIZED).send({ message: 'Incorrect email or password' });
    }

    return res.status(StatusCode.OK).json(result);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: `${err}` });
  }
};

const loginValidate = async (req:Request, res: Response): Promise<Response> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token invalid' });
    }

    const decoded = await verifyToken(authorization);
    const { data } = decoded;

    return res.status(StatusCode.OK).json(data.role);
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED)
      .json({ error: `${err}` });
  }
};

export { login, loginValidate };
