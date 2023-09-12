import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { UserDal } from './user.dal';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { ExamController } from '../exam/exam.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExamEntity, ExamQuestionEntity]),
  ],
  providers: [UserService, UserDal],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
