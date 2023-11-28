import { Controller, Get, Param, Query } from '@nestjs/common';
import { FootballService } from './football.service';

@Controller('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get(':leagueName/standings')
  async getStandingsByLeague(
    @Param('leagueName') leagueName: string,
    @Query('season') season: string,
  ): Promise<any> {
    return this.footballService.getStandingsByLeague(leagueName, season);
  }
}
