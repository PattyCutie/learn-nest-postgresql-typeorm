import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from './question-option.type';

export interface Examination {
  id: string;
  userId: string;
  examId: string;
  totalTime: number;
  examType: ExamType;
  questionType: QuestionType;
  subjectVal: SubjectVal;
  section: Section;
  part: Part;
  topic: Topic;
  level: Level;
  duration?: number;
  amount?: number;
  examQuestions: AnswerSheet[];
}

export interface AnswerSheet {
  id: string;
  examinationId: string;
  questionId: string;
  timeStart: Date;
  timeAnswer: Date;
  selectedChoice?: string | null;
}
