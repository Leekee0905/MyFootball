import { Controller, Get } from '@nestjs/common';
import { FootballService } from './football.service';
import { Observable } from 'rxjs';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get('epl-standings')
  getEplStandings(): Observable<any> {
    return this.footballService.getEplStandings();
  }
}
