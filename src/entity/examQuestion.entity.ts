import { Database } from 'src/config/db.config';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/question-option.type';
import { ExamEntity } from './exam.entity';

@Entity({ name: Database.Table.ExamQuestion })
export class ExamQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  examId: string;

  @Column({ default: 'Toeic' })
  subjectVal: SubjectVal;

  @Column({ default: 'Practice' })
  examType: ExamType;

  @Column({ default: 'Multichoice' })
  questionType: QuestionType;

  @Column({ default: 'reading' })
  section: Section;

  @Column({ default: 'reading-specific-1' })
  part: Part;

  @Column('json', { default: { 'Topic 1': ['Topic 1'] } })
  topics: Topic[];

  @Column({ default: 'Beginner' })
  level: Level;

  @Column({ nullable: true })
  question: string;

  @Column('json', { default: {} })
  choices: string[];

  @Column({ nullable: true })
  correctAnswer: string;

  @Column({ nullable: true })
  explanationEn: string;

  @Column({ nullable: true })
  explanationTh: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.examQuestions, {
    onDelete: 'CASCADE',
  })
  exam: ExamEntity;
}
