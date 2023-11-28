import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FootballService {
  private readonly apiUrl = 'https://api.football-data.org/v4/competitions';
  private readonly apiKey = process.env.FOOTBALL_API_KEY;

  async getStandingsByLeague(leagueName: string): Promise<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    const url = `${this.apiUrl}/${leagueName}/standings`;

    try {
      const response = await axios.get(url, { headers });

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
      throw error;
    }
  }
}
