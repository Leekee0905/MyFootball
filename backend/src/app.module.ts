// app.module.ts

import { Module } from '@nestjs/common';
import { TableModule } from './table/table.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [TableModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
