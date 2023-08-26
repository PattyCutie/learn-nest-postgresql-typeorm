import { ExamType } from './exam.type';

export interface ExamProgress {
  id: string;
  userId: string;
  examId: string;
  examType: ExamType;
  startedAt: Date;
  completedAt?: Date;
  totalTimeTaken: number;
  totalPoints: number;
  grade: string;
  questionProgress: {
    [questionId: string]: QuestionProgress;
  };
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
