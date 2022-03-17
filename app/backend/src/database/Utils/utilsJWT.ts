import { sign, verify } from 'jsonwebtoken';
/* import { readFileSync } from 'fs'; */
import { IToken } from '../interfaces/userInterface';

/* const secret = readFileSync(
  '../../../jwt.evaluation.key',
  { encoding: 'utf8' },
); */

const createToken = (data: IToken) => {
  const token = sign({ data }, 'secret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, 'secret');

  return decoded;
};

export { verifyToken, createToken };