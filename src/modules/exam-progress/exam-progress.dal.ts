import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamProgressEntity } from 'src/entity/exam-progress.entity';
import { Repository } from 'typeorm';
import { CreateExamProgressDto } from './dto/exam-progress.dto';

@Injectable()
export class ExamProgressDal {
  constructor(
    @InjectRepository(ExamProgressEntity)
    private readonly examProgressRepo: Repository<ExamProgressEntity>,
  ) {}

  async createExamProgress(
    createExamProgressDto: CreateExamProgressDto,
  ): Promise<ExamProgressEntity> {
    const examProgress = this.examProgressRepo.create(createExamProgressDto);
    return this.examProgressRepo.save(examProgress);
  }

  async getAllExamProgress(): Promise<ExamProgressEntity[]> {
    const allExamProgress = await this.examProgressRepo.find({
      order: {
        submittedAt: 'ASC',
      },
    });
    return allExamProgress;
  }

  async getExamProgressById(id: string): Promise<ExamProgressEntity | null> {
    const examProgress = await this.examProgressRepo.findOne({
      where: { id },
    });
    return examProgress;
  }

  async getUserById(id: string): Promise<ExamProgressEntity | null> {
    const examProgress = await this.examProgressRepo.findOne({
      where: { id },
    });
    return examProgress;
  }

  async getExamProgressByUserIdAndExamId(
    userId: string,
    examId: string,
  ): Promise<ExamProgressEntity | null> {
    return this.examProgressRepo.findOne({ where: { userId, examId } });
  }
}
