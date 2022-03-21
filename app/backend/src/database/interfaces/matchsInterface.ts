interface IMatchs {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: number;
}

interface MatchsResponse extends IMatchs{
  homeClub: { clubName: string },
  awayClub: { clubName: string }
}

export { IMatchs, MatchsResponse };
