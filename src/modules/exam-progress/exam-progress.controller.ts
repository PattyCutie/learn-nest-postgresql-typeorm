import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ExamProgressService } from './exam-progress.service';
import { CreateExamProgressDto } from './dto/exam-progress.dto';
import { HttpResponse } from 'src/types/http-response';

@Controller('exam-progress')
export class ExamProgressController {
  constructor(private readonly examProgressService: ExamProgressService) {}

  @Version('1')
  @Post()
  @HttpCode(HttpStatus.OK)
  async createExamProgress(
    @Body() createExamProgressDto: CreateExamProgressDto,
  ): Promise<HttpResponse<void>> {
    return this.examProgressService.createExamProgress(createExamProgressDto);
  }
}
