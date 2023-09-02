export class ExaminationDto {
  id: string;
  userId: string;
  examId: string;
  createdAt: Date;
  submittedAt: Date;
  answerSheet: AnswerSheetDto[];
}
export class AnswerSheetDto {
  id: string;
  examinationId: string;
  questionId: string;
  timeStart?: Date;
  timeAnswer?: Date;
  selectedChoice?: string | null;
  isCorrect?: boolean;
}
