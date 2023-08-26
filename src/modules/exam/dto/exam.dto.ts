import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsObject,
  IsOptional,
  IsDateString,
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

export class CreateExamReqDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsDateString()
  createdAt?: Date;

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
  Part: Part;

  @IsNotEmpty()
  topic: Topic;

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
  @Type(() => QuestionDTO)
  examResponse?: {
    [topic: string]: QuestionDTO;
  };
}

export class QuestionDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  part: string;

  @IsNotEmpty()
  topics: { [key: string]: Topic[] };

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  choices: string[];

  @IsNotEmpty()
  correctAnswer: string;

  @IsNotEmpty()
  explainationEn: string;

  @IsNotEmpty()
  explainationTh: string;
}
