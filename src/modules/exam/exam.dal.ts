import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { UserEntity } from 'src/entity/user.entity';
import {
  ExamReqDto,
  ExamResDto,
  ExamQuestionResDto,
  UpDateExamResDto,
} from './dto/exam.dto';

export class ExamDal {
  private readonly logger = new Logger(ExamDal.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ExamEntity)
    readonly examRepo: Repository<ExamEntity>,
    @InjectRepository(ExamQuestionEntity)
    readonly examQuestionRepo: Repository<ExamQuestionEntity>,
  ) {}

  async createExam(examResDto: DeepPartial<ExamResDto>): Promise<ExamResDto> {
    const examEntity: DeepPartial<ExamEntity> = {
      subjectVal: examResDto.subjectVal,
      examType: examResDto.examType,
      questionType: examResDto.questionType,
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
        (questionResDto: ExamQuestionResDto) => ({
          examId: savedExam.id,
          subjectVal: questionResDto.subjectVal,
          examType: questionResDto.examType,
          questionType: questionResDto.questionType,
          section: questionResDto.section,
          part: questionResDto.part,
          topics: questionResDto.topics,
          level: questionResDto.level,
          question: questionResDto.question,
          images: questionResDto.images,
          audioOutput: questionResDto.audioOutput,
          choices: questionResDto.choices,
          correctAnswer: questionResDto.correctAnswer,
          explanationEn: questionResDto.explanationEn,
          explanationTh: questionResDto.explanationTh,
        }),
      );

      const savedExamQuestions = await this.examQuestionRepo.save(questionRes);

      savedExam.examQuestions = savedExamQuestions;
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
      relations: ['examQuestions'],
    });

    if (!exam) {
      return null;
    }
    const { ...examData }: ExamResDto = exam;

    return examData as ExamResDto;
  }

  //// In case if allow to update Exam Type* -----/////
  async updateExamById(
    id: string,
    updateExamResDto: UpDateExamResDto,
  ): Promise<ExamReqDto> {
    const exam = await this.examRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!exam) {
      return null;
    }
    const { ...examData }: ExamReqDto = exam;
    const result = await this.examRepo.save({
      ...examData,
      ...updateExamResDto,
    });

    return result as ExamReqDto;
  }
  /////////////////

  async deleteExamById(id: string): Promise<boolean> {
    const exam = await this.examRepo.findOne({
      where: { id },
      relations: ['examQuestions'],
    });

    if (!exam) {
      return false;
    }
    // Delete the associated questions first
    const relateQuestiontodel = exam.examQuestions.map(
      (question) => question.id,
    );

    await this.examQuestionRepo.delete(relateQuestiontodel);
    // Then, delete the exam
    const deleteResult = await this.examRepo.delete(id);

    return deleteResult.affected > 0;
  }
}
