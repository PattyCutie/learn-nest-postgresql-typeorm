import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/question-option.type';
import { DeepPartial } from 'typeorm';

export class ExamReqDto {
  // @IsUUID()
  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  examType: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: DeepPartial<QuestionType>;

  @IsNotEmpty()
  section: DeepPartial<Section>;

  @IsNotEmpty()
  part: DeepPartial<Part>;

  @IsNotEmpty()
  topics: DeepPartial<Topic[]>;

  @IsNotEmpty()
  level: DeepPartial<Level>;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}

export class ExamResDto {
  // @IsUUID()
  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: DeepPartial<QuestionType>;

  @IsNotEmpty()
  section: DeepPartial<Section>;

  @IsNotEmpty()
  part: DeepPartial<Part>;

  @IsNotEmpty()
  topics: DeepPartial<Topic[]>;

  @IsNotEmpty()
  level: DeepPartial<Level>;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsOptional()
  @Type(() => ExamQuestionResDto)
  examQuestions: DeepPartial<ExamQuestionResDto[]>;
}

export class ExamQuestionResDto {
  // @IsNotEmpty()
  // @IsUUID()
  // examId: string;
  @IsOptional()
  serialNumber?: number;

  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionType: DeepPartial<QuestionType>;

  @IsNotEmpty()
  section: DeepPartial<Section>;

  @IsNotEmpty()
  part: DeepPartial<Part>;

  @IsNotEmpty()
  topics: DeepPartial<Topic[]>;

  @IsNotEmpty()
  level: DeepPartial<Level>;

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  images?: string[];

  @IsNotEmpty()
  audioOutput?: string[];

  @IsNotEmpty()
  choices: string[];

  @IsNotEmpty()
  correctAnswer: string[];

  @IsNotEmpty()
  explanationEn: string;

  @IsNotEmpty()
  explanationTh: string;
}

export class UpDateExamResDto {
  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;
}

export class UpdateExamResult {
  @IsOptional()
  submittedAt?: Date;

  @IsNumber()
  @IsOptional()
  totalScores?: number;
}

export class UpdateExamAnswerDto {
  @IsOptional()
  timeStart?: Date;

  @IsOptional()
  timeAnswer?: Date;

  @IsOptional()
  selectedChoice?: string[] | null;

  @IsNumber()
  @IsOptional()
  isCorrect?: number;
}
