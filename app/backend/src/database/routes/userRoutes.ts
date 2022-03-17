import { Router } from 'express';
import login from '../controller/userController';

const route = Router();

route.post('/login', login);

export default route;
