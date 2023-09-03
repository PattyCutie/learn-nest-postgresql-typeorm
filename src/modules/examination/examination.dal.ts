import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerSheetEntity } from 'src/entity/answerSheet.entity';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { Repository } from 'typeorm';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { ExamQuestionResDto, ExamResDto } from '../exam/dto/exam.dto';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';
import { QuestionType } from 'src/types/question-option.type';

@Injectable()
export class ExaminationDal {
  private readonly logger = new Logger(ExaminationDal.name);

  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepo: Repository<ExamEntity>,
    @InjectRepository(ExamQuestionEntity)
    private readonly examQuestionRepo: Repository<ExamQuestionEntity>,
    @InjectRepository(ExaminationEntity)
    private readonly examinateRepo: Repository<ExaminationEntity>,
    @InjectRepository(AnswerSheetEntity)
    private readonly anwerSheetRepo: Repository<AnswerSheetEntity>,
  ) {}

  async createExamination(
    createExaminateDto: CreateExaminateDto,
    examQuestionDto: ExamQuestionResDto,
  ): Promise<SubmitExamAnswerDto> {
    const { userId, examId, answerSheets } = createExaminateDto;
    this.logger.debug(createExaminateDto.examId, 'The Examination has begun');
    const examination = this.examinateRepo.create({
      userId,
      examId,
    });
    examination.answerSheets = [];
    let score = 0;

    for (const answer of answerSheets) {
      const isCorrect = this.isCorrectAnswer(answer, examQuestionDto);
      score += isCorrect ? 1 : 0;
      this.logger.debug(
        `Question ID: ${answer.questionId}, Is Correct: ${isCorrect}, Score: ${score}`,
      );
      const answerSheet = this.anwerSheetRepo.create({
        examinationId: examination.id,
        questionId: answer.questionId,
        timeStart: answer.timeStart,
        timeAnswer: answer.timeAnswer,
        selectedChoice: answer.selectedChoice,
        isCorrect,
      });

      examination.answerSheets.push(answerSheet);
    }
    const saveExaminate = this.examinateRepo.save(examination);
    this.logger.log(JSON.stringify(saveExaminate));
    return { ...saveExaminate, score };
  }

  private isCorrectAnswer(
    answerSheetDto: AnswerSheetDto,
    examQuestionsDto: ExamQuestionResDto,
  ): boolean {
    if (examQuestionsDto.questionTypes === QuestionType.MultipleChoice) {
      const correctAnswer = examQuestionsDto.choices?.find(
        (choice) => choice.match,
      );
      this.logger.log(correctAnswer);
      return true;
    }
    this.logger.debug(answerSheetDto, examQuestionsDto);
    return answerSheetDto.selectedChoice === examQuestionsDto.correctAnswer;
  }
}
/// start here//
/// Need a new logic for calculating score
