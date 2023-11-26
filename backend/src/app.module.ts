// app.module.ts

import { Module } from '@nestjs/common';
import { FootballModule } from './football/football.module';

@Module({
  imports: [FootballModule],
})
export class AppModule {}
