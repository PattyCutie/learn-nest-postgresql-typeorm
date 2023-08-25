import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly yourEntityRepository: Repository<ExamEntity>,
  ) {}

  async seedData(data: ExamEntity[]): Promise<void> {
    await this.yourEntityRepository.save(data);
  }
}
