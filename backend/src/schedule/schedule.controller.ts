import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':leagueName/matches')
  async getMatchessByLeague(
    @Param('leagueName') leagueName: string,
    @Query('season') season: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<any> {
    return this.scheduleService.getMatchesByLeague(
      leagueName,
      season,
      dateFrom,
      dateTo,
    );
  }
  @Get(':leagueName/teams')
  async getTeamsByLeauge(
    @Param('leagueName') leagueName: string,
    @Query('season') season: string,
  ): Promise<any> {
    return this.scheduleService.getTeamsByLeague(leagueName, season);
  }

  @Get('teams/:id/matches')
  async getMatchesByTeam(
    @Param('id') id: number,
    @Query('season') season: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<any> {
    return this.scheduleService.getMatchesByTeam(id, season, dateFrom, dateTo);
  }
}
