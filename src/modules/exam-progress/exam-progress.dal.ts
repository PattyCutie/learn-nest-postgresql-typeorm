import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamProgressDto } from './dto/exam-progress.dto';

@Injectable()
export class ExamProgressDal {}
