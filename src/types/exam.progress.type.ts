import { ExamType, QuestionType } from './exam.type';

export interface ExamProgress {
  id: string;
  userId: string;
  examId: string;
  examType: ExamType;
  questionType: QuestionType;
  startAt: Date;
  submittedAt: Date;
  amountOfQA: number;
  timeSpent: number;
  totalPoints: number;
  grade: string;
  isFinished: boolean;
  questionProgress: QuestionProgress[];
}

export interface QuestionProgress {
  selectedChoice: string | null;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
