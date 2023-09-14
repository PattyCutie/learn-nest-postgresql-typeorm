import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import {
  ExamReqDto,
  ExamResDto,
  UpDateExamResDto,
  UpdateExamResultDto,
} from './dto/exam.dto';
import { HttpResponse } from 'src/types/http-response';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamReq } from 'src/types/exam.type';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createExamWithService(
    @Body() examResDto: ExamResDto,
  ): Promise<HttpResponse<ExamResDto>> {
    return await this.examService.createExam(examResDto);
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<HttpResponse<ExamResDto[]>> {
    return this.examService.getAllExams();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getExamById(
    @Param('id') id: string,
  ): Promise<HttpResponse<ExamResDto>> {
    return this.examService.getExamById(id);
  }

  @Version('1')
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param('id') id: string,
    @Body() updateExamResDto: UpDateExamResDto,
  ): Promise<HttpResponse<ExamReqDto>> {
    return this.examService.updateExamById(id, updateExamResDto);
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExamById(
    @Param('id') id: string,
  ): Promise<HttpResponse<boolean>> {
    return this.examService.deleteExamById(id);
  }

  /////////////////
  /////////////////
  @Version('1')
  @Post('user/:id/create')
  @HttpCode(HttpStatus.OK)
  async userCreateNewExam(
    @Param('id') userId: string,
    @Body() examResDto: ExamResDto,
  ): Promise<HttpResponse<ExamEntity>> {
    return this.examService.userCreateNewExam(userId, examResDto);
  }

  @Version('1')
  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  async getExamByUserId(
    @Param('id') userId: string,
  ): Promise<HttpResponse<ExamResDto[]>> {
    return this.examService.getAExamsByUserId(userId);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Put('/:id/update')
  async updateExamAndQuestions(
    @Param('id') examId: string,
    @Body() updateExamResultDto: UpdateExamResultDto,
  ) {
    return this.examService.submitExamAns(examId, updateExamResultDto);
  }
}
