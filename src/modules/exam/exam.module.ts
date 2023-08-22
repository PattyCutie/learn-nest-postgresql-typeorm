import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';

@Module({
  providers: [ExamService],
})
export class ExamModule {}
