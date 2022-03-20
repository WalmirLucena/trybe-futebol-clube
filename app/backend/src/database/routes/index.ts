import { Router } from 'express';
import clubsRoute from './clubsRoutes';
import loginRoute from './userRoutes';

const route = Router();

route.use('/login', loginRoute);
route.use('/clubs', clubsRoute);

export default route;
