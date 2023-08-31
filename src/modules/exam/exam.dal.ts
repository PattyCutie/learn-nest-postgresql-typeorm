import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { Repository } from 'typeorm';
import { ExamResDto } from './dto/exam.dto';
import { QuestionEntity } from 'src/entity/question.entity';

export class ExamDal {
  private readonly logger = new Logger(ExamDal.name);

  constructor(
    @InjectRepository(ExamEntity)
    readonly examReqRepo: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    readonly questionResRepo: Repository<QuestionEntity>,
  ) {}

  // async createExam(examResDto: ExamResDto): Promise<ExamResDto> {
  //   const sampleExamRes: ExamResDto = {
  //     userId: examResDto.userId,
  //     totalTime: examResDto.totalTime,
  //     examType: examResDto.examType,
  //     questionTypes: examResDto.questionTypes,
  //     subjectVal: examResDto.subjectVal,
  //     section: examResDto.section,
  //     part: examResDto.part,
  //     topics: examResDto.topics,
  //     level: examResDto.level,
  //     duration: examResDto.duration,
  //     amount: examResDto.amount,
  //     examResponse: examResDto.examResponse,
  //   };

  //   const newExamRes = await this.examReqRepo.save(sampleExamRes);

  //   return newExamRes;
  // }

  // async getAllExams(): Promise<ExamResDto[]> {
  //   const allExam = await this.examReqRepo.find({
  //     order: {
  //       createdAt: 'ASC',
  //     },
  //   });

  //   const result: ExamResDto[] = allExam.map((exam) => {
  //     const { ...examsData }: ExamResDto = exam;
  //     return examsData;
  //   });

  //   return result;
  // }

  // async getExamById(id: string): Promise<ExamResDto | null> {
  //   const exam = await this.examReqRepo.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (!exam) {
  //     return null;
  //   }
  //   const { ...examData }: ExamResDto = exam;

  //   return examData as ExamResDto;
  // }

  // async updateExamById(id: string): Promise<ExamResDto | null> {
  //   const exam = await this.examReqRepo.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!exam) {
  //     return null;
  //   }
  //   const { ...examData }: ExamResDto = exam;
  //   const result = await this.examReqRepo.save({
  //     ...examData,
  //   });

  //   return result as ExamResDto;
  // }

  async deleteExamById(id: string): Promise<boolean> {
    const exam = await this.examReqRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!exam) {
      return null;
    }
    const examTodel = await this.examReqRepo.delete({
      id,
    });

    if (examTodel.affected === 0) {
      return false;
    }
    return true;
  }
}
