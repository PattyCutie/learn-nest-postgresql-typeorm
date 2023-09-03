import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateExaminateDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  examId: string;

  @IsDate()
  @IsOptional()
  submittedAt: Date;

  @IsNotEmpty()
  answerSheets: AnswerSheetDto[];
}

export class AnswerSheetDto {
  @IsNotEmpty()
  @IsString()
  examinationId: string;

  @IsNotEmpty()
  @IsString()
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
  isCorrect?: boolean;
}

export class SubmitExamAnswerDto {
  @IsNotEmpty()
  @IsString()
  examId: string;

  @IsDate()
  submittedAt: Date;
}
