import { Injectable, Logger } from '@nestjs/common';
import { ExamReqDto, ExamResDto } from './dto/exam.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExamDal } from './exam.dal';
import { ExamHttpService } from 'src/modules/http/http.sevice';
import responseConfig from 'src/config/response.config';
import { AxiosResponse } from 'axios';
import { UpdateUserDto } from '../user/dto/createUserDto';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);
  constructor(
    private readonly examDal: ExamDal,
    private readonly httpService: ExamHttpService,
  ) {}

  // async createExam(
  //   examResDto: ExamResDto,
  // ): Promise<HttpResponse<{ exams: ExamResDto }>> {
  //   // In case we send post req to external api
  //   // const externalDataResponse: AxiosResponse<ExamReqDto> =
  //   // await this.httpService.generateExam(examReqDto);
  //   // const externalData: ExamResDto = externalDataResponse.data;
  //   // const examResponse = {};

  //   try {
  //     const saveExam = await this.examDal.createExam(examResDto);

  //     this.logger.log('Successfully saved new exam to database');
  //     this.logger.debug(JSON.stringify(saveExam));
  //     return {
  //       statusCode: responseConfig.SUCCESS.statusCode,
  //       message: responseConfig.SUCCESS.message,
  //       data: { exams: saveExam },
  //     };
  //   } catch (error) {
  //     this.logger.error('Failed to save exam request to database');
  //     this.logger.error(error);
  //     return {
  //       statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
  //       message: responseConfig.INTERNAL_SERVER_ERROR.message,
  //     };
  //   }
  // }

  // async getAllExams(): Promise<HttpResponse<{ exams: ExamResDto[] }>> {
  //   try {
  //     const allExams = await this.examDal.getAllExams();

  //     if (allExams.length === 0) {
  //       return {
  //         statusCode: responseConfig.NOT_FOUND.statusCode,
  //         message: responseConfig.NOT_FOUND.message,
  //       };
  //     }
  //     this.logger.log('Successfully get all exam from database');
  //     this.logger.debug(`Number of exams: ${allExams.length}`);
  //     return {
  //       statusCode: responseConfig.SUCCESS.statusCode,
  //       message: responseConfig.SUCCESS.message,
  //       data: { exams: allExams },
  //     };
  //   } catch (error) {
  //     this.logger.error('Failed to get all exams from database');
  //     this.logger.error(error);
  //     return {
  //       statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
  //       message: responseConfig.INTERNAL_SERVER_ERROR.message,
  //     };
  //   }
  // }

  // async getExamById(id: string): Promise<HttpResponse<ExamResDto>> {
  //   try {
  //     const examById = await this.examDal.getExamById(id);

  //     if (!examById) {
  //       return {
  //         statusCode: responseConfig.NOT_FOUND.statusCode,
  //         message: responseConfig.NOT_FOUND.message,
  //       };
  //     }
  //     this.logger.log('Successfully get exam by id from database');
  //     this.logger.debug(examById);
  //     return {
  //       statusCode: responseConfig.SUCCESS.statusCode,
  //       message: responseConfig.SUCCESS.message,
  //       data: examById,
  //     };
  //   } catch (error) {
  //     this.logger.error('Failed to get all exams from database');
  //     this.logger.error(error);
  //     return {
  //       statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
  //       message: responseConfig.INTERNAL_SERVER_ERROR.message,
  //     };
  //   }
  // }

  // async updateExamById(id: string): Promise<HttpResponse<ExamResDto>> {
  //   try {
  //     const updateUserById = await this.examDal.updateExamById(id);
  //     if (!updateUserById) {
  //       return {
  //         statusCode: responseConfig.NOT_FOUND.statusCode,
  //         message: responseConfig.NOT_FOUND.message,
  //       };
  //     }
  //     this.logger.log(`Successfully update user from database with id: ${id}`);
  //     this.logger.debug(JSON.stringify(updateUserById));
  //     return {
  //       statusCode: responseConfig.SUCCESS_UPDATED.statusCode,
  //       message: responseConfig.SUCCESS_UPDATED.message,
  //       data: updateUserById,
  //     };
  //   } catch (error) {
  //     this.logger.error(`Failed to update user from database with id: ${id}`);
  //     this.logger.error(error);
  //     return {
  //       statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
  //       message: responseConfig.INTERNAL_SERVER_ERROR.message,
  //     };
  //   }
  // }

  async deleteExamById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const userData = await this.examDal.deleteExamById(id);
      if (!userData) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully deleted user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(userData));
      return {
        statusCode: responseConfig.SUCCESS_DELETE.statusCode,
        message: responseConfig.SUCCESS_DELETE.message,
        data: userData,
      };
    } catch (error) {
      this.logger.error(`Failed to delete exam from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
