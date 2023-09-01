import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from './question-option.type';
export interface ExamReq {
  id: string;
  userId: string;
  createdAt?: Date;
  subjectVal: SubjectVal;
  examType: ExamType;
  questionTypes: QuestionType;
  section: Section;
  part: Part;
  topics: Topic[];
  level: Level;
  duration: number;
  amount: number;
  examQuestions: Question[];
}

export interface Question {
  id: string;
  examId: string;
  subjectVal: SubjectVal;
  examType?: ExamType;
  questionTypes: QuestionType;
  section: Section;
  level: Level;
  part: string;
  topics: Topic[];
  question: string;
  choices: string[];
  correctAnswer: string;
  explainationEn: string;
  explainationTh: string;
}
