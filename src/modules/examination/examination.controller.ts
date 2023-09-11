import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ExamQuestionResDto } from '../exam/dto/exam.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExaminationService } from './examination.service';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  ResExaminationDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { AnswerSheet, Examination } from 'src/types/examination.type';

@Controller('examination')
export class ExaminationController {
  constructor(private readonly examinateService: ExaminationService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createExamination(
    @Body('id') id: string,
    @Body() createExaminateDto: CreateExaminateDto,
    @Body() answerSheetDto: AnswerSheet[],
  ): Promise<HttpResponse<Examination>> {
    return await this.examinateService.createExamination(
      id,
      createExaminateDto,
      answerSheetDto,
    );
  }
  //submit api + calculate fx && create exam progress Entity
  @Version('1')
  @Patch('submit/:id')
  @HttpCode(HttpStatus.OK)
  async submitExamination(
    @Param('id') id: string,
    @Body() submitExaminateDto: SubmitExamAnswerDto,
  ): Promise<HttpResponse<SubmitExamAnswerDto>> {
    return await this.examinateService.submitExamination(
      id,
      submitExaminateDto,
    );
  }
  //get exam progess api
}
