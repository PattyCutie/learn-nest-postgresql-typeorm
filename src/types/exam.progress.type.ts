import { ExamType, QuestionType } from './question-option.type';

export interface ExamProgress {
  id: string;
  userId: string;
  examId: string;
  createdAt: Date;
  examType: ExamType;
  questionType: QuestionType;
  startAt: Date;
  amountOfQA: number;
  timeSpent: number;
  totalPoints: number;
  graded: string;
  isFinished: boolean;
  questionProgresses: QuestionProgress[];
}

export interface QuestionProgress {
  id: string;
  examProgressId: string;
  questionId: string;
  timeTaken: number;
  iscorrected?: boolean;
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
