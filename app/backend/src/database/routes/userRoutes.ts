import { Router } from 'express';
import { login, loginValidate } from '../controller/userController';
import validateUser from '../middlewares/userValidations';

const loginRoute = Router();

loginRoute.post('/login', validateUser, login);
loginRoute.get('/login/validate', loginValidate);

export default loginRoute;
