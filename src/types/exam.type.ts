export interface ExamReqForm {
  userId: string;
  examType?: ExamType;
  subject: Subject;
  section: Section;
  Part: Part;
  topic: Topic;
  level: Level;
  questionTypes: QuestionType;
  duration?: number;
  amount?: number;
}

export interface ExamRes extends ExamReqForm {
  createdAt: Date;
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  level: Level;
  question: string;
  choices: string[];
  correctAnswer: string;
}

export type ExamType = 'Actual' | 'Practice';

export type Level =
  | 'auto'
  | 'Beginer'
  | 'Regular'
  | 'intermediate'
  | 'advance'
  | 'mix';

export type QuestionType =
  | 'MultipleChoice'
  | 'MultipleResponse'
  | 'TrueFalse'
  | 'SortingRanking'
  | 'FillBlank';

///////////////////////////
// Need to impro this below maybe there is too complicate mapping??
export type SubjectToeic = 'Toeic';
export type SubjectBiology = 'Biology';

export type Subject = SubjectToeic | SubjectBiology;

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
