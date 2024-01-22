import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  private newMonthObject: Record<string, any[]> = {};
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
      let dateKey = new Date(match.utcDate)
        .toLocaleDateString()
        .slice(5, 12)
        .split('')
        .map((e) => e.trim())
        .join('');

      if (dateKey.at(-1) === '.') {
        dateKey = dateKey.slice(0, -1);
      }
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
      if (error.response && error.response.status === 429) {
        throw new HttpException(
          'API 요청 제한 초과. 나중에 다시 시도하세요.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
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
      if (error.response && error.response.status === 429) {
        throw new HttpException(
          'API 요청 제한 초과. 나중에 다시 시도하세요.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw error;
    }
  }

  async getMatchesByTeam(
    id: number,
    season: string,
    dateFrom: string,
    dateTo: string,
    competitions: number,
  ): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.teamMatchUrl}/${id}/matches`;

    try {
      const response = await axios.get(url, {
        headers,
        params: {
          season: season,
          dateFrom: dateFrom,
          dateTo: dateTo,
          competitions: competitions,
        },
      });
      const matchesData: MatchData[] = response.data.matches;

      const groupedData = this.groupMatchesByDate(matchesData);

      return groupedData;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        throw new HttpException(
          'API 요청 제한 초과. 나중에 다시 시도하세요.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      throw error;
    }
  }
}
