import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { QuestionEntity } from 'src/entity/question.entity';
import { HttpServiceModule } from 'src/modules/http/http.module';
import { ExamDal } from './exam.dal';
import { UserEntity } from 'src/entity/user.entity';
import { UserDal } from '../user/user.dal';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity, QuestionEntity, UserEntity]),
    HttpServiceModule,
  ],
  providers: [ExamService, ExamDal, UserDal, UserService],
  controllers: [ExamController],
})
export class ExamModule {}
