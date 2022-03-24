import clubsService from './clubsService';
import matchsService from './matchsService';
import { drawAwayTeam,
  drawHomeTeam,
  lossAwayTeam,
  lossHomeTeam,
  winAwayTeam,
  winHomeTeam,
  putClubsOnTable,
  sortClassification } from '../Utils/utilsLeaderboard';
import ILeaderboard from '../interfaces/leaderboardInterface';
import Matchs from '../models/Matchs';

const verifyResultAwayTeam = (matchs: Matchs[], leaderboard: ILeaderboard[]) => {
  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.awayTeamGoals - match.homeTeamGoals;
      if (result === 0) return drawAwayTeam(match, leaderboard);
      if (result < 0) return lossAwayTeam(match, leaderboard);
      return winAwayTeam(match, leaderboard);
    }
  });
  return leaderboard;
};

const verifyResultHomeTeam = (matchs: Matchs[], leaderboard: ILeaderboard[]) => {
  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.homeTeamGoals - match.awayTeamGoals;
      if (result === 0) return drawHomeTeam(match, leaderboard);
      if (result < 0) return lossHomeTeam(match, leaderboard);
      return winHomeTeam(match, leaderboard);
    }
  });
  return leaderboard;
};

const generateLeaderboardHome = async () => {
  const matchs = await matchsService.getAll();
  const clubs = await clubsService.getAll();

  const leaderboard = putClubsOnTable(clubs);

  verifyResultHomeTeam(matchs, leaderboard);

  return sortClassification(leaderboard);
};

const generateLeaderboardAway = async () => {
  const matchs = await matchsService.getAll();
  const clubs = await clubsService.getAll();

  const leaderboard = putClubsOnTable(clubs);

  verifyResultAwayTeam(matchs, leaderboard);

  return sortClassification(leaderboard);
};

const generateLeaderboard = async () => {
  const matchs = await matchsService.getAll();
  const clubs = await clubsService.getAll();
  const leaderboard = putClubsOnTable(clubs);

  verifyResultHomeTeam(matchs, leaderboard);
  verifyResultAwayTeam(matchs, leaderboard);

  return sortClassification(leaderboard);
};

export default { generateLeaderboardHome, generateLeaderboardAway, generateLeaderboard };
