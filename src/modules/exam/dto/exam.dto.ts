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
} from 'src/types/exam.type';

export class ExamReqDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  totalTime: number;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: ExamType;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: QuestionType;

  @IsNotEmpty()
  subjectVal: SubjectVal;

  @IsNotEmpty()
  section: Section;

  @IsNotEmpty()
  part: Part;

  @IsNotEmpty()
  topics: { [key: string]: Topic[] };

  @IsNotEmpty()
  level: Level;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsObject()
  @IsOptional()
  @Type(() => QuestionResDto)
  examResponse?: QuestionResDto[];
}

export class ExamResDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  totalTime: number;

  @IsEnum(ExamType)
  @IsOptional()
  examType?: ExamType;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: QuestionType;

  @IsNotEmpty()
  subjectVal: SubjectVal;

  @IsNotEmpty()
  section: Section;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  part: Part;

  @IsNotEmpty()
  topics: Topic[];

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsOptional()
  @Type(() => QuestionResDto)
  examResponse?: QuestionResDto[];
}

export class QuestionResDto {
  @IsEnum(ExamType)
  @IsOptional()
  examType?: ExamType;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  questionTypes: QuestionType;

  @IsNotEmpty()
  subjectVal: SubjectVal;

  @IsNotEmpty()
  section: Section;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  part: string;

  @IsNotEmpty()
  topics: Topic[];

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
