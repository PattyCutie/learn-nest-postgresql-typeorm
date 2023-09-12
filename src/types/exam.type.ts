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
  createdAt?: Date;
  subjectVal: SubjectVal;
  examType: ExamType;
  questionType: QuestionType;
  section: Section;
  part: Part;
  topics: Topic[];
  level: Level;
  duration?: number;
  amount?: number;
  submittedAt?: Date;
  totlalScores?: number;
  examQuestions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  serialNumber: string;
  subjectVal: SubjectVal;
  examType?: ExamType;
  questionTypes: QuestionType;
  section: Section;
  level: Level;
  part: string;
  topics: Topic[];
  question: string;
  images?: string[];
  audioOutput?: string[];
  choices: string[];
  correctAnswer: string[];
  explainationEn: string;
  explainationTh: string;
  timeStart?: Date;
  timeAnswer?: Date;
  selectedChoice?: string[] | null;
  isCorrect?: number;
}
