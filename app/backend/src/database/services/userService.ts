import User from '../models/User';
import { createToken } from '../Utils/utilsJWT';
import { ILogin } from '../interfaces/userInterface';

const login = async (data: ILogin) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email, password } });

  if (!user) return ({ message: 'Incorrect email or password' });

  const token = createToken(user);

  return { user, token };
};

export default login;
