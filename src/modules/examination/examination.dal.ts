import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerSheetEntity } from 'src/entity/answerSheet.entity';
import { ExaminationEntity } from 'src/entity/examination.entity';
import { DeepPartial, Repository } from 'typeorm';
import {
  AnswerSheetDto,
  CreateExaminateDto,
  SubmitExamAnswerDto,
} from './dto/examination.dto';
import { ExamQuestionResDto, ExamResDto } from '../exam/dto/exam.dto';
import { ExamEntity } from 'src/entity/exam.entity';
import { ExamQuestionEntity } from 'src/entity/examQuestion.entity';

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
    answerSheetDto: AnswerSheetDto,
  ): Promise<SubmitExamAnswerDto> {
    const examinationEntity: DeepPartial<ExaminationEntity> = {
      userId: createExaminateDto.userId,
      examId: createExaminateDto.examId,
      submittedAt: createExaminateDto.submittedAt,
      answerSheets: createExaminateDto.answerSheets,
    };

    const saveExamitaion = await this.examinateRepo.save(examinationEntity);

    if (createExaminateDto.answerSheets) {
      const answerSheet = createExaminateDto.answerSheets.map(
        (ans: AnswerSheetDto) => ({
          examinationId: saveExamitaion.id,
          questionId: ans.questionId,
          timestart: ans.timeStart,
          timeAnswer: ans.timeAnswer,
          selectedChoice: ans.selectedChoice,
          isCorrect: ans.isCorrect,
        }),
      );
      const saveExamitaionAnswer = await this.anwerSheetRepo.save(answerSheet);
      saveExamitaion.answerSheets = saveExamitaionAnswer;
    }
    return saveExamitaion as SubmitExamAnswerDto;
  }
}
