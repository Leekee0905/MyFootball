export interface TableTeam {
  crest: string;
  id: number;
  name: string;
  shortName: string;
  tla: string;
}

export interface SeasonTable {
  draw: number;
  form: string;
  won: number;
  lost: number;
  points: number;
  playedGames: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  position: number;
  team: TableTeam;
}

export interface TableType {
  currentMatchDay: number;
  emblem: string;
  leagueid: number;
  leagueName: string;
  season: string;
  standings: SeasonTable[];
}
