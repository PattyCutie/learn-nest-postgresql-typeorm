import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ExamQuestionResDto, ExamResDto } from '../exam/dto/exam.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExaminationService } from './examination.service';
import { CreateExaminateDto, SubmitExamAnswerDto } from './dto/examination.dto';

@Controller('examination')
export class ExaminationController {
  constructor(private readonly examinateService: ExaminationService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createExamWithService(
    @Body() createExaminateDto: CreateExaminateDto,
    examQuestionDto: ExamQuestionResDto,
  ): Promise<HttpResponse<{ examinate: SubmitExamAnswerDto }>> {
    return await this.examinateService.createExamination(
      createExaminateDto,
      examQuestionDto,
    );
  }
}
