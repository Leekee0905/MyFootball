import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TableService {
  private readonly apiUrl = 'https://api.football-data.org/v4/competitions';
  private readonly apiKey = process.env.FOOTBALL_API_KEY;

  async getStandingsByLeague(leagueName: string, season: string): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.apiUrl}/${leagueName}/standings`;

    try {
      const response = await axios.get(url, {
        headers,
        params: { season: season },
      });

      const standingData = {
        emblem: response.data.competition.emblem,
        leagueName: response.data.competition.name,
        leagueId: response.data.competition.id,
        season: response.data.filters.season,
        currentMatchday: response.data.season.currentMatchday,
        standings: response.data.standings[0].table,
      };

      return standingData;
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
