import { Router } from 'express';
import clubsRoute from './clubsRoutes';
import leaderboardRoute from './leaderboardRoutes';
import matchsRoute from './matchsRoutes';
import loginRoute from './userRoutes';

const route = Router();

route.use('/login', loginRoute);
route.use('/clubs', clubsRoute);
route.use('/matchs', matchsRoute);
route.use('/leaderboard', leaderboardRoute);

export default route;
