import { Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { DeepPartial, Index, Repository } from 'typeorm';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { UserEntity } from 'src/entity/user.entity';
import {
  ExamReqDto,
  ExamResDto,
  ExamQuestionResDto,
  UpDateExamResDto,
  UpdateExamResultDto,
} from './dto/exam.dto';
import { join } from 'path';

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

  async createExam(examResDto: ExamResDto): Promise<ExamResDto> {
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

    this.logger.log(savedExam);
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

  async userCreateNewExam(
    userId: string,
    examResDto: ExamResDto,
  ): Promise<ExamEntity> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const createNewExam: DeepPartial<ExamResDto> = this.examRepo.create({
      ...examResDto,
      //examQuestions: [examResDto.examQuestions[0]],
      user,
    });

    const savedExam = await this.examRepo.save(createNewExam);

    const createQ = examResDto.examQuestions.map(
      (questionResDto: ExamQuestionResDto) => ({
        ...questionResDto,
        examId: savedExam.id,
      }),
    );
    const saveQ = await this.examQuestionRepo.save(createQ);
    savedExam.examQuestions = [...saveQ];

    return savedExam;
  }

  async getAExamsByUserId(userId: string): Promise<ExamResDto[]> {
    const examsOfUser = await this.examRepo.find({
      where: { user: { id: userId } },
    });

    if (!examsOfUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    // const examIds = examsOfUser.map((exam) => exam.id);
    // examsOfUser.forEach((exam) => {
    //   exam.examQuestions = examIds[exam.id];
    // });

    // // Logging examsOfUser for debugging
    // this.logger.debug(JSON.stringify(examIds));

    return examsOfUser;
  }

  async getExamAll(): Promise<ExamEntity[]> {
    const allExams = this.examRepo.find({
      relations: ['examQuestions'],
    });
    return allExams;
  }

  /////////////////////////////////////////
  /// Fx Below need to fix becuase it does not update and seeding correctly
  async submitExamAns(
    examId: string,
    updateExamResultDto: UpdateExamResultDto,
  ): Promise<ExamEntity | null> {
    const exam = await this.examRepo.findOne({
      where: { examQuestions: { id: examId } },
      relations: ['examQuestions'],
    });

    if (!exam) {
      this.logger.error(`User with id ${examId} not found`);
    }

    // Update exam
    exam.submittedAt = updateExamResultDto.submittedAt;
    exam.totalScores = this.calculateTotalScores(exam.examQuestions);
    // Save the updated exam
    const updatedExam = await this.examRepo.save(exam);

    return await this.examRepo.save(updatedExam);
  }

  //////////////////////////////////
  //// prepare functions for calculate score
  private calculateCorrectness(
    correctAnswer: string[],
    selectedChoice: string[] | null,
  ): number {
    if (!selectedChoice) {
      return 0;
    }

    const correct = correctAnswer.join(',');
    const selected = selectedChoice.join(',');

    return correct === selected ? 1 : 0;
  }

  private calculateTotalScores(questions: ExamQuestionEntity[]): number {
    let totalScores = 0;
    questions.forEach((question) => {
      if (question.isCorrect === 1) {
        totalScores += 1;
      }
    });
    return totalScores;
  }
}
