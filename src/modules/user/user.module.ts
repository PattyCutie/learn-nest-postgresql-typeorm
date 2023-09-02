import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { UserDal } from './user.dal';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { AnswerSheetEntity } from 'src/entity/answerSheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ExamEntity,
      ExamQuestionEntity,
      ExaminationEntity,
      AnswerSheetEntity,
    ]),
  ],
  providers: [UserService, UserDal],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
