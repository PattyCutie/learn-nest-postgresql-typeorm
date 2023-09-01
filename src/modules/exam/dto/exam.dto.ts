import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
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
  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: DeepPartial<QuestionType>;

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
  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: DeepPartial<QuestionType>;

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
  @Type(() => QuestionResDto)
  questions: DeepPartial<QuestionResDto[]>;
}

export class QuestionResDto {
  @IsNotEmpty()
  subjectVal: DeepPartial<SubjectVal>;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: DeepPartial<ExamType>;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: DeepPartial<QuestionType>;

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
  choices: string[];

  @IsNotEmpty()
  correctAnswer: string;

  @IsNotEmpty()
  explanationEn: string;

  @IsNotEmpty()
  explanationTh: string;
}
