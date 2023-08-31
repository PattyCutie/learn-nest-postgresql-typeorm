import { Module } from '@nestjs/common';
import { ExamProgressService } from './exam-progress.service';
import { ExamProgressController } from './exam-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamProgressDal } from './exam-progress.dal';
import { ExamProgressEntity } from 'src/entity/exam-progress.entity';
import { QuestionProgressEntity } from 'src/entity/question-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamProgressEntity, QuestionProgressEntity]),
  ],
  providers: [ExamProgressService, ExamProgressDal],
  controllers: [ExamProgressController],
})
export class ExamProgressModule {}
