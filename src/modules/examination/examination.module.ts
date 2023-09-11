import { Module } from '@nestjs/common';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';
import { HttpServiceModule } from '../http/http.module';
import { ExaminationDal } from './examination.dal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { AnswerSheetEntity } from 'src/entity/answerSheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExaminationEntity, AnswerSheetEntity]),
    HttpServiceModule,
  ],
  providers: [ExaminationService, ExaminationDal],
  controllers: [ExaminationController],
})
export class ExaminationModule {}
