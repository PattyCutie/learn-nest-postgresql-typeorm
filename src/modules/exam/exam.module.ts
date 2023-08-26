import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { QuestionEntity } from 'src/entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity, QuestionEntity])],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
