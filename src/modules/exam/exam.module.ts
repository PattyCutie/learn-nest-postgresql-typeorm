import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { HttpServiceModule } from 'src/modules/http/http.module';
import { ExamDal } from './exam.dal';
import { UserEntity } from 'src/entity/user.entity';
import { UserDal } from '../user/user.dal';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity, ExamQuestionEntity, UserEntity]),
    HttpServiceModule,
  ],
  providers: [ExamService, ExamDal, UserService, UserDal],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExamModule {}
