import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/entity/exam.entity';
import { DeepPartial, Index, Repository } from 'typeorm';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { UserEntity } from 'src/entity/user.entity';
import {
  ExamReqDto,
  ExamResDto,
  ExamQuestionResDto,
  UpdateExamResult,
  UpDateExamResDto,
  UpdateExamAnswerDto,
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
      examQuestions: [examResDto.examQuestions[0]],
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
      select: ['id', 'exams', 'examQuestions'],
      relations: ['exams', 'examQuestions'],
    });
    if (!user) {
      this.logger.error(`User with id ${userId} not found`);
    }
    const createNewExam = this.examRepo.create({
      ...examResDto,
      user,
    });

    const savedExam = await this.examRepo.save(createNewExam);
    user.exams.push(savedExam);
    //await this.userRepo.save(user);
    const saveQ = await this.examQuestionRepo.save(savedExam.examQuestions);
    savedExam.examQuestions = saveQ;

    return savedExam;
  }

  /// Fx Below need to fix becuase it does not update and seeding correctly
  async submitExamAns(
    examId: string,
    updateExamDto: UpdateExamResult,
    updateAnswerDto: UpdateExamAnswerDto,
  ): Promise<ExamEntity | null> {
    const exam = await this.examRepo.findOne({
      where: { id: examId },
      relations: ['examQuestions'],
    });

    if (!exam) {
      this.logger.error(`User with id ${examId} not found`);
    }

    // Update exam
    exam.submittedAt = updateExamDto.submittedAt;
    exam.totalScores = this.calculateTotalScores(exam.examQuestions);

    // Save the updated exam
    const updatedExam = await this.examRepo.save(exam);

    // Update associated exam questions and track answers
    if (exam.examQuestions) {
      const updateExamAns = await Promise.all(
        exam.examQuestions.map(async (questionDto, index) => {
          const question = exam.examQuestions.find(
            (q) => q.id === questionDto.id,
          );

          if (!question) {
            this.logger.error('Question not found!');
          }

          // update answer
          question.timeStart = updateAnswerDto.timeStart[index];
          question.timeAnswer = updateAnswerDto.timeAnswer[index];
          question.selectedChoice = updateAnswerDto.selectedChoice;
          // Calculate correctness
          question.isCorrect = this.calculateCorrectness(
            question.correctAnswer,
            question.selectedChoice,
          );

          return await this.examQuestionRepo.save(question);
        }),
      );

      updatedExam.examQuestions = updateExamAns;
    }

    return await this.examRepo.save(updatedExam);
  }

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
