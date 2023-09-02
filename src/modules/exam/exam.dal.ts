import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ExamReqDto, ExamResDto, ExamQuestionResDto } from './dto/exam.dto';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';

export class ExamDal {
  private readonly logger = new Logger(ExamDal.name);

  constructor(
    @InjectRepository(ExamEntity)
    readonly examRepo: Repository<ExamEntity>,
    @InjectRepository(ExamQuestionEntity)
    readonly questionRepo: Repository<ExamQuestionEntity>,
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
        (questionResDto: ExamQuestionResDto) => ({
          examId: savedExam.id,
          subjectVal: questionResDto.subjectVal,
          examType: questionResDto.examType,
          questionTypes: questionResDto.questionTypes,
          section: questionResDto.section,
          part: questionResDto.part,
          topics: questionResDto.topics,
          level: questionResDto.level,
          question: questionResDto.question,
          choices: questionResDto.choices,
          correctAnswer: questionResDto.correctAnswer,
          explanationEn: questionResDto.explanationEn,
          explanationTh: questionResDto.explanationTh,
        }),
      );

      const savedExamQuestionsRepo = await this.questionRepo.save(questionRes);

      savedExam.examQuestions = savedExamQuestionsRepo;
    }

    return savedExam as ExamResDto;
  }

  async getAllExams(): Promise<ExamResDto[]> {
    const allExam = await this.examRepo.find({
      relations: ['examQuestions'],
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

  // fix this later after Main data base Question library is ready /////
  // this shound be the function for prouser who wanted to re create new exam /////
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
    // Find the exam by ID and load the examQuestions relationship
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
    await this.questionRepo.delete(relateQuestiontodel);
    // Then, delete the exam
    const deleteResult = await this.examRepo.delete(id);

    return deleteResult.affected > 0;
  }
}
