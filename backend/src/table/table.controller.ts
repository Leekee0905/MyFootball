import { Controller, Get, Param, Query } from '@nestjs/common';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get(':leagueName/standings')
  async getStandingsByLeague(
    @Param('leagueName') leagueName: string,
    @Query('season') season: string,
  ): Promise<any> {
    return this.tableService.getStandingsByLeague(leagueName, season);
  }
}
