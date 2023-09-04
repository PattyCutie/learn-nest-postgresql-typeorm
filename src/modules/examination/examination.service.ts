import { Injectable, Logger } from '@nestjs/common';
import { ExaminationDal } from './examination.dal';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExamQuestionResDto } from '../exam/dto/exam.dto';
import responseConfig from 'src/config/response.config';

@Injectable()
export class ExaminationService {
  private readonly logger = new Logger(ExaminationService.name);
  constructor(private readonly examinateDal: ExaminationDal) {}

  async createExamination(
    createExaminateDto: CreateExaminateDto,
    answerSheetDto: AnswerSheetDto,
  ): Promise<HttpResponse<{ examinate: SubmitExamAnswerDto }>> {
    try {
      const result = await this.examinateDal.createExamination(
        createExaminateDto,
        answerSheetDto,
      );
      this.logger.log('Successfully create examination');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: { examinate: result },
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
}
