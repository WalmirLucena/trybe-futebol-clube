import clubsService from './clubsService';
import matchsService from './matchsService';
import Clubs from '../models/Clubs';
import ILeaderboard from '../interfaces/leaderboardInterface';

const putClubsOnTable = (clubs: Clubs[]) => {
  const leaderboard: ILeaderboard[] = [];
  clubs.forEach((club) => {
    leaderboard.push({
      name: club.clubName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 100,
    });
  });
  return leaderboard;
};

const drawHomeTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalDraws += 1;
      team.totalPoints += 1;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const drawAwayTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.awayClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalDraws += 1;
      team.totalPoints += 1;
      team.goalsFavor += match.awayTeamGoals;
      team.goalsOwn += match.homeTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const lossHomeTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalLosses += 1;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const lossAwayTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.awayClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalLosses += 1;
      team.goalsFavor += match.awayTeamGoals;
      team.goalsOwn += match.homeTeamGoals;
      team.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const winHomeTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalVictories += 1;
      team.totalPoints += 3;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const winAwayTeam = (match : any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.awayClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalVictories += 1;
      team.totalPoints += 3;
      team.goalsFavor += match.awayTeamGoals;
      team.goalsOwn += match.homeTeamGoals;
      team.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      team.efficiency = +((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    }
  });

const sortClassification = (leaderboard: ILeaderboard[]) =>
  leaderboard.sort((teamA, teamB) => {
    if (teamB.totalPoints < teamA.totalPoints) return -1;
    if (teamB.totalPoints > teamA.totalPoints) return 1;
    if (teamB.totalVictories < teamA.totalVictories) return -1;
    if (teamB.totalVictories > teamA.totalVictories) return 1;
    if (teamB.goalsBalance < teamA.goalsBalance) return -1;
    if (teamB.goalsBalance > teamA.goalsBalance) return 1;
    if (teamB.goalsFavor < teamA.goalsFavor) return -1;
    if (teamB.goalsFavor > teamA.goalsFavor) return 1;
    if (teamB.goalsOwn < teamA.goalsOwn) return -1;
    if (teamB.goalsOwn > teamA.goalsOwn) return 1;
    return 0;
  });

const generateLeaderboardHome = async () => {
  const matchs = await matchsService.getAll();
  const clubs = await clubsService.getAll();

  const leaderboard = putClubsOnTable(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.homeTeamGoals - match.awayTeamGoals;

      if (result === 0) return drawHomeTeam(match, leaderboard);
      if (result < 0) return lossHomeTeam(match, leaderboard);
      return winHomeTeam(match, leaderboard);
    }
  });

  return sortClassification(leaderboard);
};

const generateLeaderboardAway = async () => {
  const matchs = await matchsService.getAll();
  const clubs = await clubsService.getAll();

  const leaderboard = putClubsOnTable(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.awayTeamGoals - match.homeTeamGoals;

      if (result === 0) return drawAwayTeam(match, leaderboard);
      if (result < 0) return lossAwayTeam(match, leaderboard);
      return winAwayTeam(match, leaderboard);
    }
  });

  return sortClassification(leaderboard);
};

export default { generateLeaderboardHome, generateLeaderboardAway };
