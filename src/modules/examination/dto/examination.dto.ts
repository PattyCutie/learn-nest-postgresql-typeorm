import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsUUID,
} from 'class-validator';

export class CreateExaminateDto {
  // @IsNotEmpty()
  // @IsUUID()
  // userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  // // @IsDate()
  // // @IsOptional()
  // // submittedAt?: Date;

  @IsNotEmpty()
  answerSheets?: AnswerSheetDto[];
}

export class ResExaminationDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  // @IsDate()
  // @IsOptional()
  // submittedAt?: Date;

  @IsNotEmpty()
  answerSheets?: AnswerSheetDto[];
}

export class AnswerSheetDto {
  @IsNotEmpty()
  @IsUUID()
  examinationId: string;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @IsDate()
  timeStart: Date;

  @IsDate()
  timeAnswer: Date;

  @IsOptional()
  @IsString()
  selectedChoice?: string | null;

  @IsOptional()
  @IsBoolean()
  isCorrect?: number;
}

export class SubmitExamAnswerDto {
  // @IsNotEmpty()
  // @IsUUID()
  // userId: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsDate()
  submittedAt: Date;

  @IsNotEmpty()
  answerSheets: AnswerSheetDto[];
}
