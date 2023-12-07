export interface MatchData {
  id: number;
  status: string;
  utcDate: string;
  minute?: number;
  injuryTime?: number;
  attendance?: number;
  venue?: string;
  matchday: number;
  homeTeam: TeamData;
  awayTeam: TeamData;
  referees: RefereeData[];
  score: ScoreData;
}

export interface ScoreData {
  winner: string;
  duration: string;
  fullTime: {
    home: number;
    away: number;
  };
  halfTime: {
    home: number;
    away: number;
  };
}
export interface TeamData {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface RefereeData {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface TeamListData {
  id: number;
  team: string;
  crest: string;
  competitonId?: number;
}
