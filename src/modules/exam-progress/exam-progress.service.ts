import { Injectable, Logger } from '@nestjs/common';
import { ExamProgressDal } from './exam-progress.dal';
import { CreateExamProgressDto } from './dto/exam-progress.dto';
import responseConfig from 'src/config/response.config';
import { HttpResponse } from 'src/types/http-response';

@Injectable()
export class ExamProgressService {
  private readonly logger = new Logger(ExamProgressService.name);
  constructor(private readonly examProgressDal: ExamProgressDal) {}

  async createExamProgress(
    createExamProgressDto: CreateExamProgressDto,
  ): Promise<HttpResponse<void>> {
    try {
      const examProgress = await this.examProgressDal.createExamProgress(
        createExamProgressDto,
      );
      const { ...result } = examProgress;

      this.logger.log('Successfully saved exam progress to database');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS_CREATE.statusCode,
        message: responseConfig.SUCCESS_CREATE.message,
      };
    } catch (error) {
      this.logger.error('Failed to save exam progress to database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
