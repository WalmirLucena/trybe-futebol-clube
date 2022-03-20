import { Router } from 'express';
import clubsRoute from './clubsRoutes';
import matchsRoute from './matchsRoutes';
import loginRoute from './userRoutes';

const route = Router();

route.use('/login', loginRoute);
route.use('/clubs', clubsRoute);
route.use('/matchs', matchsRoute);

export default route;
