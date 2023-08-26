import { Module } from '@nestjs/common';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';

@Module({
  controllers: [ExaminationController],
  providers: [ExaminationService],
})
export class ExaminationModule {}
