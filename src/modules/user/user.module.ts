import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExamService } from '../exam/exam.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ExamService],
})
export class UserModule {}
