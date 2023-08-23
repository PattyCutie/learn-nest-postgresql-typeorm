import { ExamReqForm, ExamRes, Level } from './exam.type';

export interface UserAnalytic {
  userId: string;
  performanceTrendsOverTime: number[];
  averageTimeSpentOnEachQuestion: number;
  successRateForEachQuestion: number[];
  comparisonWithOtherUsersPerformance: number;
  totalScoreSubject: Record<string, number>;
  totalScoreSkillPart: Record<string, number>;
  totalScoreExamLevel: Record<Level, number>;
  overallPercentagePerformance: number;
  examProgresses: ExamProgress[];
}

export interface ExamProgress {
  userId: string;
  examId: string;
  startAt: Date;
  submittedAt: Date;
  amountOfQA: number;
  timeSpent: number;
  totalPointsEarned: number;
  examDetails: ExamDetails;
}
export interface ExamDetails extends ExamRes {
  userChoices: UserChoice[];
}

export interface UserChoice {
  examId: string;
  questionId: string;
  questionIndex: number;
  choice: string;
  isCorrect: IsCorrectChoice;
}

export type IsCorrectChoice = boolean | null;
