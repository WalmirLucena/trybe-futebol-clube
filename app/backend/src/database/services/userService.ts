import { compareSync } from 'bcryptjs';
import User from '../models/User';
import { createToken } from '../Utils/utilsJWT';
import { ILogin } from '../interfaces/userInterface';

const login = async (data: ILogin) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });

  if (!user) return false;

  const passwordCheck = compareSync(password, user.password);

  if (!passwordCheck) return ({ message: 'Incorrect email or password' });

  const token = createToken({ email, username: user.username, role: user.role });

  const userFiltered = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email,
    },
    token };

  return userFiltered;
};

export default { login };
