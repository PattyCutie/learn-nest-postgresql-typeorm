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
  totalTime: number;
  examType: ExamType;
  questionTypes: QuestionType;
  subjectVal: SubjectVal;
  section: Section;
  Part: Part;
  topic: Topic;
  level: Level;
  duration?: number;
  amount?: number;
  examResponse: {
    [questionId: string]: QuestSheet;
  };
}

export interface QuestSheet {
  id: string;
  timeStart: Date;
  timeAnswer: Date;
  level: Level;
  part: Part;
  topics: {
    [topic: string]: Topic[];
  };
  question: string;
  choices: string[];
  selectedChoice?: string | null;
}
