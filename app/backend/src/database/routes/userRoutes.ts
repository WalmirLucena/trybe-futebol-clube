import { Router } from 'express';
import { login, loginValidate } from '../controller/userController';
import validateUser from '../middlewares/userValidations';

const loginRoute = Router();

loginRoute.post('/', validateUser, login);
loginRoute.get('/validate', loginValidate);

export default loginRoute;
