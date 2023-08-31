import { Module } from '@nestjs/common';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { AnswerSheetEntity } from 'src/entity/answer-sheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExaminationEntity, AnswerSheetEntity])],
  controllers: [ExaminationController],
  providers: [ExaminationService],
})
export class ExaminationModule {}
