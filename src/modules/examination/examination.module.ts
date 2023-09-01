import { Module } from '@nestjs/common';
import { ExaminationController } from './examination.controller';

@Module({
  controllers: [ExaminationController]
})
export class ExaminationModule {}
