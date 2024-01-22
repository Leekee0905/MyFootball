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
export interface StandingDataType {
  crest: string;
  draw: number;
  form: string;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  id: number;
  lost: number;
  name: string;
  playedGames: number;
  points: number;
  position: number;
  shortName: string;
  tla: string;
  won: number;
}

export interface TableProps {
  tableHeader: Array<string>;
  isHome: boolean;
}
