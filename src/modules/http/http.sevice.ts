import { Injectable, Logger } from '@nestjs/common';
import { ExamReqDto } from 'src/modules/exam/dto/exam.dto';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExamHttpService {
  private readonly logger = new Logger(ExamHttpService.name);

  constructor(private readonly httpService: HttpService) {}
  private config = {
    Headers: {
      'Content-Type': 'application/json',
    },
    baseURL: process.env.EXAM_API_BASE_URL,
  };

  async generateExam(
    examReqDTO: ExamReqDto,
  ): Promise<AxiosResponse<ExamReqDto>> {
    const result: AxiosResponse<ExamReqDto> = await firstValueFrom(
      this.httpService.post('/create_exam', examReqDTO, this.config),
    );
    return result;
  }
}
