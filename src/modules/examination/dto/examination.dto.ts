import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/question-option.type';

export class ExaminationDto {
  id: string;
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
  answerSheet: AnswerSheetDto[];
}
export class AnswerSheetDto {
  id: string;
  examinationId: string;
  questionId: string;
  timeStart: Date;
  timeAnswer: Date;
  selectedChoice?: string | null;
}
