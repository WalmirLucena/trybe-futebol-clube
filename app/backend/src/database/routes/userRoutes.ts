import { Router } from 'express';
import { login, loginValidate } from '../controller/userController';
import validateUser from '../middlewares/userValidations';

const route = Router();

route.post('/login', validateUser, login);
route.get('/login/validate', loginValidate);

export default route;
