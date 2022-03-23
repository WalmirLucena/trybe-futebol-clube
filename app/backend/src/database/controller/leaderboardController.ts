import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';
import StatusCode from '../Utils/StatusCode';

const generateLeaderboardHome = async (req: Request, res: Response) => {
  const result = await leaderboardService.generateLeaderboard();
  return res.status(StatusCode.OK).json(result);
};

export default { generateLeaderboardHome };
