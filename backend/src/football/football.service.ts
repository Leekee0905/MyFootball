import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class FootballService {
  private readonly apiUrl =
    'https://api.football-data.org/v4/competitions/PL/standings';
  private readonly apiKey = process.env.FOOTBALL_API_KEY;

  getEplStandings(): Observable<any> {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    return new Observable((observer) => {
      axios
        .get(this.apiUrl, { headers })
        .then((response) => {
          const standingData = {
            emblem: response.data.competition.emblem,
            leagueName: response.data.competition.name,
            leagueId: response.data.competition.id,
            season: response.data.filters.season,
            currentMatchday: response.data.season.currentMatchday,
            standings: response.data.standings[0].table,
          };
          observer.next(standingData);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
