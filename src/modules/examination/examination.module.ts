import { Module } from '@nestjs/common';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';
import { HttpServiceModule } from '../http/http.module';
import { UserService } from '../user/user.service';
import { UserDal } from '../user/user.dal';
import { ExaminationDal } from './examination.dal';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { ExamService } from '../exam/exam.service';
import { ExamDal } from '../exam/exam.dal';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExaminationEntity,
      //   AnswerSheetEntity,
      UserEntity,
      ExamEntity,
      ExamQuestionEntity,
    ]),
    HttpServiceModule,
  ],
  providers: [
    ExamService,
    ExamDal,
    ExaminationService,
    ExaminationDal,
    UserService,
    UserDal,
  ],
  controllers: [ExaminationController],
})
export class ExaminationModule {}
