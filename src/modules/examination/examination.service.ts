import { Injectable, Logger } from '@nestjs/common';
import { ExaminationDal } from './examination.dal';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  ResExaminationDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExamQuestionResDto } from '../exam/dto/exam.dto';
import responseConfig from 'src/config/response.config';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { AnswerSheet, Examination } from 'src/types/examination.type';

@Injectable()
export class ExaminationService {
  private readonly logger = new Logger(ExaminationService.name);
  constructor(private readonly examinateDal: ExaminationDal) {}

  async createExamination(
    id: string,
    createExaminateDto: CreateExaminateDto,
    answerSheetDto: AnswerSheet[],
  ): Promise<HttpResponse<Examination>> {
    try {
      const result = await this.examinateDal.createExamination(
        id,
        createExaminateDto,
        answerSheetDto,
      );
      this.logger.log('Successfully create examination');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: result,
      };
    } catch (error) {
      this.logger.error('Failed to create examination to database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
  //submit api + calculate fx && create exam progress Entity
  async submitExamination(
    id: string,
    submitExaminateDto: SubmitExamAnswerDto,
  ): Promise<HttpResponse<SubmitExamAnswerDto>> {
    try {
      const result = await this.examinateDal.submitExamination(
        id,
        submitExaminateDto,
      );
      this.logger.log('Successfully create examination');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: result,
      };
    } catch (error) {
      this.logger.error('Failed to create examination to database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
  //get exam progess api
}
