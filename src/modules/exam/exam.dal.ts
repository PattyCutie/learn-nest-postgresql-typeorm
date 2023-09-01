import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ExamReqDto, ExamResDto, QuestionResDto } from './dto/exam.dto';
import { QuestionEntity } from 'src/entity/question.entity';

export class ExamDal {
  private readonly logger = new Logger(ExamDal.name);

  constructor(
    @InjectRepository(ExamEntity)
    readonly examRepo: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    readonly questionRepo: Repository<QuestionEntity>,
  ) {}

  async createExam(examResDto: DeepPartial<ExamResDto>): Promise<ExamResDto> {
    const examEntity: DeepPartial<ExamEntity> = {
      userId: examResDto.userId,
      subjectVal: examResDto.subjectVal,
      examType: examResDto.examType,
      questionTypes: examResDto.questionTypes,
      section: examResDto.section,
      part: examResDto.part,
      topics: examResDto.topics,
      level: examResDto.level,
      duration: examResDto.duration,
      amount: examResDto.amount,
      examQuestions: examResDto.examQuestions,
    };

    const savedExam = await this.examRepo.save(examEntity);

    if (examResDto.examQuestions) {
      const questionRes = examResDto.examQuestions.map(
        (questionDto: QuestionResDto) => ({
          examId: savedExam.id,
          subjectVal: questionDto.subjectVal,
          examType: questionDto.examType,
          questionTypes: questionDto.questionTypes,
          section: questionDto.section,
          part: questionDto.part,
          topics: questionDto.topics,
          level: questionDto.level,
          question: questionDto.question,
          choices: questionDto.choices,
          correctAnswer: questionDto.correctAnswer,
          explanationEn: questionDto.explanationEn,
          explanationTh: questionDto.explanationTh,
        }),
      );

      const savedQuestionEntities = await this.questionRepo.save(questionRes);

      savedExam.examQuestions = savedQuestionEntities;
    }

    return savedExam as ExamResDto;
  }

  async getAllExams(): Promise<ExamResDto[]> {
    const allExam = await this.examRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });

    const result: ExamResDto[] = allExam.map((exam) => {
      const { ...examsData }: ExamResDto = exam;
      return examsData;
    });

    return result;
  }

  async getExamById(id: string): Promise<ExamResDto | null> {
    const exam = await this.examRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!exam) {
      return null;
    }
    const { ...examData }: ExamResDto = exam;

    return examData as ExamResDto;
  }

  async updateExamById(id: string): Promise<ExamResDto | null> {
    const exam = await this.examRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!exam) {
      return null;
    }
    const { ...examData }: ExamResDto = exam;
    const result = await this.examRepo.save({
      ...examData,
    });

    return result as ExamResDto;
  }

  async deleteExamById(id: string): Promise<boolean> {
    const exam = await this.examRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!exam) {
      return null;
    }
    const examTodel = await this.examRepo.delete({
      id,
    });

    if (examTodel.affected === 0) {
      return false;
    }
    return true;
  }
}
