import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerSheetEntity } from 'src/entity/answerSheet.entity';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { DeepPartial, Repository } from 'typeorm';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  ResExaminationDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { ExamQuestionResDto, UpdateExamAnswerDto } from '../exam/dto/exam.dto';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { UserEntity } from 'src/entity/user.entity';
import { QuestionType } from 'src/types/question-option.type';
import { AnswerSheet, Examination } from 'src/types/examination.type';
@Injectable()
export class ExaminationDal {
  private readonly logger = new Logger(ExaminationDal.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepo: Repository<ExamEntity>,
    @InjectRepository(ExamQuestionEntity)
    private readonly examQuestionRepo: Repository<ExamQuestionEntity>,
    @InjectRepository(ExaminationEntity)
    private readonly examinateRepo: Repository<ExaminationEntity>,
    @InjectRepository(AnswerSheetEntity)
    private readonly answerSheetRepo: Repository<AnswerSheetEntity>,
  ) {}

  async createExamination(
    id: string,
    createExaminateDto: CreateExaminateDto,
    answerSheetDto: AnswerSheet[],
  ): Promise<Examination> {
    const getExam = await this.examRepo.findBy({ id: id });
    if (!getExam) {
      this.logger.error(`Exam with ID : ${id} not found`);
    }
    this.logger.debug(`${JSON.stringify(getExam)}`);

    const savedExamination = await this.examinateRepo.save(createExaminateDto);

    this.logger.debug(`${JSON.stringify(savedExamination)}`);

    const getAnswerSheet = savedExamination.answerSheets.map((ans) => {
      const examQ = getExam.find((eQ) => eQ.id === ans.questionId);
      this.logger.debug(getAnswerSheet, examQ);
      return {
        examinateId: savedExamination.id,
        questionId: examQ.id,
        timeStart: ans.timeAnswer,
        timeAnswer: ans.timeAnswer,
        selectedChoice: ans.selectedChoice,
        isCorrect: ans.isCorrect,
      };
    });
    const saveAnswerSheets = await this.answerSheetRepo.save(getAnswerSheet);
    savedExamination.answerSheets.push(...saveAnswerSheets);
    await this.examinateRepo.save(savedExamination);
    this.logger.debug(
      `this is examination : ${JSON.stringify(savedExamination)}`,
    );
    this.logger.debug(
      `this is answer sheet : ${JSON.stringify(getAnswerSheet)}`,
    );
    return savedExamination as Examination;
  }

  // async createExamination(
  //   id: string,
  //   createExaminateDto: CreateExaminateDto,
  // ): Promise<ExaminationEntity> {
  //   const getExam = await this.examRepo.findOne({
  //     where: { id },
  //     relations: ['user', 'examQuestions'],
  //   });
  //   if (!getExam) {
  //     this.logger.error(`Exam ${id} not found !`);
  //   }

  //   const examinationEntity: DeepPartial<ExaminationEntity> = {
  //     examId: getExam.id,
  //     answerSheets: [],
  //   };

  //   const savedExamination = await this.examinateRepo.save(examinationEntity);
  //   this.logger.debug(
  //     `Found Exam with ID: ${getExam.id} from User ID: ${getExam.user.id}`,
  //   );
  //   this.logger.debug(
  //     `Exam with ID: ${getExam.id} has Exam questions Data: ${JSON.stringify(
  //       getExam.examQuestions,
  //     )} `,
  //   );

  //   this.logger.debug(
  //     `Exam Question data ${JSON.stringify(createExaminateDto.answerSheets)}`,
  //   );

  //   if (createExaminateDto.answerSheets) {
  //     const examQuestion = getExam.examQuestions.find((examQ) => examQ.id);
  //     const answerSheets = createExaminateDto.answerSheets.map(
  //       (ans: AnswerSheetDto) => ({
  //         examinationId: savedExamination.id,
  //         questionId: examQuestion.id,
  //         timestart: ans.timeStart,
  //         timeAnswer: ans.timeAnswer,
  //         selectedChoice: ans.selectedChoice,
  //         isCorrect: ans.isCorrect,
  //       }),
  //     );
  //     const savedExaminationAnswer =
  //       await this.answerSheetRepo.save(answerSheets);
  //     savedExamination.answerSheets = savedExaminationAnswer;
  //     await this.examRepo.save(getExam);
  //     this.logger.debug(`Exam Question ID ${JSON.stringify(examQuestion.id)}`);
  //   }

  //   return savedExamination as ExaminationEntity;
  // }

  // async createExamination(
  //   id: string,
  //   createExaminateDto: CreateExaminateDto,
  // ): Promise<ExaminationEntity> {
  //   const getExam = await this.examRepo.findOne({
  //     where: { id },
  //     relations: ['user', 'examQuestions'],
  //   });
  //   if (!getExam) {
  //     this.logger.error(`Exam ${id} not found !`);
  //   }
  //   const examinationEntity: DeepPartial<ExaminationEntity> = {
  //     examId: getExam.id,
  //     answerSheets: createExaminateDto.answerSheets,
  //   };

  //   const savedExamination = await this.examinateRepo.save(examinationEntity);

  //   if (createExaminateDto.answerSheets) {
  //     const answerSheets = createExaminateDto.answerSheets.map(
  //       (ans: AnswerSheetDto) => {
  //         const examQuestion = getExam.examQuestions.find(
  //           (question) => question.id === ans.questionId,
  //         );
  //         if (!examQuestion) {
  //           this.logger.error(
  //             `Exam question with id ${ans.questionId} not found`,
  //           );
  //         }
  //         //const isCorrect = this.calculateExamScore(ans, examQuestion);
  //         return {
  //           examinationId: savedExamination.id,
  //           questionId: examQuestion.id,
  //           timeStart: ans.timeStart,
  //           timeAnswer: ans.timeAnswer,
  //           selectedChoice: ans.selectedChoice,
  //           isCorrect: ans.isCorrect,
  //         };
  //       },
  //     );
  //     const saveAnswerSheets = await this.answerSheetRepo.save(answerSheets);
  //     savedExamination.answerSheets = saveAnswerSheets;
  //   }
  //   return savedExamination as ExaminationEntity;
  // }

  private calculateExamScore(
    updateExamAnswerDto: UpdateExamAnswerDto,
    examQuestionResDto: ExamQuestionResDto,
  ): number {
    if (examQuestionResDto.questionType === QuestionType.MultipleChoice) {
      this.logger.debug(
        examQuestionResDto.questionType,
        QuestionType.MultipleChoice,
      );
      return updateExamAnswerDto.selectedChoice ===
        examQuestionResDto.correctAnswer
        ? 1
        : 0;
    }
  }
  //submit api + calculate fx && create exam progress Entity
  async submitExamination(
    id: string,
    submitExaminateDto: SubmitExamAnswerDto,
  ): Promise<SubmitExamAnswerDto> {
    const examinationEntity: DeepPartial<ExaminationEntity> = {
      examId: submitExaminateDto.examId,
      submittedAt: submitExaminateDto.submittedAt,
      answerSheets: submitExaminateDto.answerSheets,
    };

    const savedExamination = await this.examinateRepo.save(examinationEntity);

    if (submitExaminateDto.answerSheets) {
      const answerSheet = submitExaminateDto.answerSheets.map(
        (ans: AnswerSheetDto) => ({
          examinationId: savedExamination.id,
          questionId: ans.questionId,
          timestart: ans.timeStart,
          timeAnswer: ans.timeAnswer,
          selectedChoice: ans.selectedChoice,
          isCorrect: ans.isCorrect,
        }),
      );
      const savedExaminationAnswer =
        await this.answerSheetRepo.save(answerSheet);
      savedExamination.answerSheets = savedExaminationAnswer;
    }
    return savedExamination as SubmitExamAnswerDto;
  }

  //get exam progess api
}
