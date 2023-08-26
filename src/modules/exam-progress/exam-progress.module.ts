import { Module } from '@nestjs/common';
import { ExamProgressService } from './exam-progress.service';
import { ExamProgressController } from './exam-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamProgressDal } from './exam-progress.dal';

@Module({
  //imports: [TypeOrmModule.forFeature([ExamProgressEntity])],
  providers: [ExamProgressService, ExamProgressDal],
  controllers: [ExamProgressController],
})
export class ExamProgressModule {}
