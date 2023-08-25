import { Module } from '@nestjs/common';
import { ExamProgressService } from './exam-progress.service';
import { ExamProgressController } from './exam-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamProgressEntity } from 'src/entity/exam-progress.entity';
import { ExamProgressDal } from './exam-progress.dal';
import { QuestionEntity } from 'src/entity/question.entity';
import { UserChoiceEntity } from 'src/entity/user-choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamProgressEntity,
      QuestionEntity,
      UserChoiceEntity,
    ]),
  ],
  providers: [ExamProgressService, ExamProgressDal],
  controllers: [ExamProgressController],
})
export class ExamProgressModule {}
