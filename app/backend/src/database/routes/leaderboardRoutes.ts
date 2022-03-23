import { Router } from 'express';
import leaderboardController from '../controller/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', leaderboardController.generateLeaderboardHome);
leaderboardRoute.get('/away', leaderboardController.generateLeaderboardAway);

export default leaderboardRoute;
