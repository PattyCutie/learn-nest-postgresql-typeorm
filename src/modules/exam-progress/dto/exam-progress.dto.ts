import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsUUID,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ExamType, QuestionType } from 'src/types/exam.type';

export class CreateExamProgressDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsNotEmpty()
  examType: ExamType;

  @IsNotEmpty()
  questionType: QuestionType;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  submittedAt: Date;

  @IsNumber()
  amountOfQA: number;

  @IsNumber()
  timeSpent: number;

  @IsNumber()
  totalPoints: number;

  @IsString()
  grade: string;

  @IsBoolean()
  isFinished: boolean;
}

export class UpdateExamProgressDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsNotEmpty()
  @IsNumber()
  amountOfQA: number;

  @IsNotEmpty()
  @IsNumber()
  timeSpent: number;

  @IsNotEmpty()
  @IsNumber()
  totalPoints: number;

  @IsNotEmpty()
  @IsBoolean()
  isFinished: boolean;

  @IsNotEmpty()
  questionProgress: QuestionProgressDto[];
}

export class QuestionProgressDto {
  selectedChoice: string | null;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
}
