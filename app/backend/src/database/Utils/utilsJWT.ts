import { sign, verify } from 'jsonwebtoken';

import { IToken } from '../interfaces/userInterface';

const createToken = async (data: IToken) => {
  const token = sign({ data }, 'secret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = async (token: string) => {
  const decoded = verify(token, 'secret');

  return decoded as { data: { role: string } };
};

export { verifyToken, createToken };
