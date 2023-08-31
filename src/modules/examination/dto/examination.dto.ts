import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/exam.type';

export class ExaminationDto {
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
  examQuestions: AnswerSheetDto[];
}

export class AnswerSheetDto {
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
