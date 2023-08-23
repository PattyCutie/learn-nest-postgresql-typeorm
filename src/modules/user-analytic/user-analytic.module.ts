import { Module } from '@nestjs/common';
import { UserAnalyticService } from './user-analytic.service';
import { UserAnalyticController } from './user-analytic.controller';

@Module({
  providers: [UserAnalyticService],
  controllers: [UserAnalyticController],
})
export class UserAnalyticModule {}
