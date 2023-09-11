import { Database } from 'src/config/db.config';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  UpdateDateColumn,
  JoinTable,
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
import { UserEntity } from './user.entity';

@Entity({ name: Database.Table.ExamQuestion })
export class ExamQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  serialNubmer: string;

  @Column({ default: 'Toeic' })
  subjectVal: SubjectVal;

  @Column({ default: 'Practice' })
  examType: ExamType;

  @Column({ default: 'Multichoice' })
  questionType: QuestionType;

  @Column({ default: 'reading' })
  section: Section;

  @Column({ default: 'Beginner' })
  level: Level;

  @Column({ default: 'reading-specific-1' })
  part: Part;

  @Column('json', { default: {} })
  topics: Topic[];

  @Column({ nullable: false })
  question: string;

  @Column('json', { nullable: true })
  images?: string[];

  @Column('json', { nullable: true })
  audioOutput?: string[];

  @Column('json', { default: {} })
  choices: string[];

  @Column('json', { nullable: false })
  correctAnswer: string[];

  @Column({ nullable: false })
  explanationEn: string;

  @Column({ nullable: false })
  explanationTh: string;

  @UpdateDateColumn({ type: 'timestamp' })
  timeStart?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  timeAnswer?: Date;

  @Column('json', { default: {} })
  selectedChoice?: string | null;

  @Column({ nullable: true })
  isCorrect?: number;

  @ManyToMany(() => ExamEntity, (exam) => exam.examQuestions, {
    cascade: true,
  })
  @JoinTable({ name: 'exams_examQuestions' })
  exams: ExamEntity[];

  @ManyToMany(() => UserEntity, (users) => users.examQuestions)
  user: UserEntity[];
}
