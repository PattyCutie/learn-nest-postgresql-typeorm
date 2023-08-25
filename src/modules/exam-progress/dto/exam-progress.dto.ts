import { IsNotEmpty, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CreateExamProgressDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

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
}
