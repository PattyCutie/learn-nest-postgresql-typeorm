export interface Examination {
  id: string;
  userId: string;
  examId: string;
  createdAt: Date;
  submittedAt?: Date;
  answerSheet?: AnswerSheet[];
}

export interface AnswerSheet {
  id: string;
  examinationId: string;
  questionId: string;
  timeStart?: Date;
  timeAnswer?: Date;
  selectedChoice?: string | null;
  isCorrect?: boolean;
}
