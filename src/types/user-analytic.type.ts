import { ExamRes, Level, Part, SubjectVal } from './exam.type';

export interface UserAnalytic {
  userId: string;
  examProgresses: ExamProgress[];
  performanceTrendsOverTime: number[];
  averageTimeSpentOnEachQuestion: number;
  successRateForEachQuestion: number[];
  comparisonWithOtherUsersPerformance: number;
  totalScoreSubjectVal: Record<SubjectVal, number>;
  totalScoreSkillPart: Record<Part, number>;
  totalScoreExamLevel: Record<Level, number>;
  overallPercentagePerformance: number;
}

export interface ExamProgress {
  userId: string;
  examId: string;
  startAt: Date;
  submittedAt: Date;
  amountOfQA: number;
  timeSpent: number;
  totalPoints: number;
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
  isCorrectChoice: IsCorrectChoice;
}

export type IsCorrectChoice = boolean | null;
