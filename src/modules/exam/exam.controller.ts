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
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamResDto } from './dto/exam.dto';
import { HttpResponse } from 'src/types/http-response';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createExamWithService(
    @Body() examResDto: ExamResDto,
  ): Promise<HttpResponse<{ exams: ExamResDto }>> {
    return await this.examService.createExam(examResDto);
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<HttpResponse<{ exams: ExamResDto[] }>> {
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
  ): Promise<HttpResponse<ExamResDto>> {
    return this.examService.updateExamById(id);
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExamById(
    @Param('id') id: string,
  ): Promise<HttpResponse<boolean>> {
    return this.examService.deleteExamById(id);
  }
}
