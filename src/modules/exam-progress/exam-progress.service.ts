import { Injectable, Logger } from '@nestjs/common';
import { ExamProgressDal } from './exam-progress.dal';
import { CreateExamProgressDto } from './dto/exam-progress.dto';
import responseConfig from 'src/config/response.config';
import { HttpResponse } from 'src/types/http-response';

@Injectable()
export class ExamProgressService {}
