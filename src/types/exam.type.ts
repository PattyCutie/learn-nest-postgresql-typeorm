export interface ExamReq {
  id: string;
  userId: string;
  createdAt?: Date;
  totalTime: number;
  examType?: ExamType;
  questionTypes: QuestionType;
  subjectVal: SubjectVal;
  section: Section;
  level: Level;
  part: Part;
  topics: Topic[];
  duration?: number;
  amount?: number;
  examResponse?: Question[];
}
export interface Question {
  id: string;
  examType?: ExamType;
  questionTypes: QuestionType;
  subjectVal: SubjectVal;
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

////////////////////////////////////////////////
////// Exam details !
export enum ExamType {
  Actual = 'Actual',
  Practice = 'Practice',
}

export type Level =
  | 'auto'
  | 'Beginner'
  | 'Regular'
  | 'intermediate'
  | 'advance'
  | 'mix';

export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  MultipleResponse = 'MultipleResponse',
  TrueFalse = 'TrueFalse',
  SortingRanking = 'SortingRanking',
  FillBlank = 'FillBlank',
}

///////////////////////////
// Need to improve this below maybe there is too complicate mapping??
// Learn more about dynamic types later**
export type subjectValToeic = 'Toeic';
export type subjectValBiology = 'Biology';

export type SubjectVal = subjectValToeic | subjectValBiology;

/// Section depend on Subject
export type SectionToeic = 'reading' | 'listening';
export type SectionBiology = 'theory' | 'bioLab';

export type Section = SectionToeic | SectionBiology;

export type SectionMap = {
  Toeic: SectionToeic;
  Biology: SectionBiology;
};

/// Part depend on Subject, section
export type PartToeicReading = 'reading-specific-1' | 'reading-specific-2';
export type PartToeicListening =
  | 'listening-specific-1'
  | 'listening-specific-2';

export type PartBiologyTheory = 'theory-specific-1' | 'theory-specific-2';
export type PartBiologyBioLab = 'bioLab-specific-1' | 'bioLab-specific-2';

export type Part =
  | PartToeicReading
  | PartToeicListening
  | PartBiologyTheory
  | PartBiologyBioLab;

export type PartMap = {
  Toeic: {
    reading: PartToeicReading;
    listening: PartToeicListening;
  };
  Biology: {
    theory: PartBiologyTheory;
    bioLab: PartBiologyBioLab;
  };
};

/// Topic depen on Subject, section, part
export type TopicToeicReading = 'Topic 1' | 'Topic 2';

export type TopicToeicListening = 'Topic A' | 'Topic B';

export type TopicBiologyTheory =
  | 'Theory Topic X'
  | 'Theory Topic Y'
  | 'Theory Topic Z';

export type TopicBiologyBioLab =
  | 'BioLab Topic P'
  | 'BioLab Topic Q'
  | 'BioLab Topic R';

export type Topic =
  | TopicToeicReading
  | TopicToeicListening
  | TopicBiologyTheory
  | TopicBiologyBioLab;

export type TopicMap = {
  Toeic: {
    reading: TopicToeicReading[];
    listening: TopicToeicListening[];
  };
  Biology: {
    theory: TopicBiologyTheory[];
    bioLab: TopicBiologyBioLab[];
  };
};
