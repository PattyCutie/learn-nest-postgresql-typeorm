import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from './exam.type';

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
  timeStart: Date;
  timeAnswer: Date;
  level: Level;
  part: Part;
  topics: Topic[];
  question: string;
  choices: string[];
  selectedChoice?: string | null;
}
