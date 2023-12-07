import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface MatchData {
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

interface ScoreData {
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
interface TeamData {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

interface RefereeData {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

interface TeamListData {
  id: number;
  team: string;
  crest: string;
}

@Injectable()
export class ScheduleService {
  private readonly apiUrl = 'https://api.football-data.org/v4/competitions';
  private readonly teamMatchUrl = 'https://api.football-data.org/v4/teams';
  private readonly apiKey = process.env.FOOTBALL_API_KEY;

  private extractMatchFields(match: MatchData): any {
    const {
      id,
      status,
      utcDate,
      minute,
      injuryTime,
      attendance,
      venue,
      matchday,
      homeTeam,
      awayTeam,
      referees,
      score,
    } = match;

    return {
      id,
      status,
      utcDate,
      minute,
      injuryTime,
      attendance,
      venue,
      matchday,
      homeTeam,
      awayTeam,
      referees,
      score,
    };
  }

  private groupMatchesByDate(matches: MatchData[]): Record<string, any[]> {
    const groupedMatches: Record<string, any[]> = {};

    matches.forEach((match) => {
      const dateKey = match.utcDate.slice(0, 10);

      if (!groupedMatches[dateKey]) {
        groupedMatches[dateKey] = [];
      }

      groupedMatches[dateKey].push(this.extractMatchFields(match));
    });

    return groupedMatches;
  }

  async getMatchesByLeague(
    leagueName: string,
    season: string,
    dateFrom: string,
    dateTo: string,
  ): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.apiUrl}/${leagueName}/matches`;

    try {
      const response = await axios.get(url, {
        headers,
        params: { season: season, dateFrom: dateFrom, dateTo: dateTo },
      });

      const matchesData: MatchData[] = response.data.matches;

      const groupedData = this.groupMatchesByDate(matchesData);

      return groupedData;
    } catch (error) {
      throw error;
    }
  }

  async getTeamsByLeague(leagueName: string, season: string): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.apiUrl}/${leagueName}/standings`;

    try {
      const response = await axios.get(url, {
        headers,
        params: { season: season },
      });

      const teams = response.data.standings[0].table.map((e) => ({
        id: e.team.id,
        team: e.team.tla,
        crest: e.team.crest,
      }));
      teams.sort((a: TeamListData, b: TeamListData) =>
        a.team > b.team ? 1 : -1,
      );
      teams.unshift({
        competitionId: response.data.competition.id,
        id: 0,
        team: '전체',
        crest: response.data.competition.emblem,
      });
      return teams;
    } catch (error) {
      throw error;
    }
  }

  async getMatchesByTeam(
    id: number,
    season: string,
    dateFrom: string,
    dateTo: string,
  ): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.teamMatchUrl}/${id}/matches`;

    try {
      const response = await axios.get(url, {
        headers,
        params: { season: season, dateFrom: dateFrom, dateTo: dateTo },
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
