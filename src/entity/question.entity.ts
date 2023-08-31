import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExamEntity } from './exam.entity';
import {
  ExamType,
  Level,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/exam.type';
import { Database } from 'src/config/db.config';

@Entity({ name: Database.Table.Question })
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  examId: string;

  @Column({ default: 'Practice' })
  examType: ExamType;

  @Column()
  questionTypes: QuestionType;

  @Column({ default: 'Toeic' })
  subjectVal: SubjectVal;

  @Column()
  section: Section;

  @Column({ nullable: true })
  level: Level;

  @Column({ nullable: true })
  part: string;

  @Column('json', { nullable: true })
  topics: Topic[];

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

  @ManyToOne(() => ExamEntity, (exam) => exam.questions)
  @JoinColumn({ name: 'exam' })
  exam: ExamEntity;
}
