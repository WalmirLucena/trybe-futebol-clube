import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

import { IToken } from '../interfaces/userInterface';

const jwtKey = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

const createToken = async (data: IToken) => {
  const token = sign({ data }, jwtKey, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = async (token: string) => {
  const decoded = verify(token, jwtKey);

  return decoded as { data: { role: string } };
};

export { verifyToken, createToken };
