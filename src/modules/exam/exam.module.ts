import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamEntity } from 'src/entity/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
