import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ExamQuestionEntity } from './examQuestion.entity';
import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/question-option.type';
import { Database } from 'src/config/db.config';
import { UserEntity } from './user.entity';
import { Examination } from 'src/types/examination.type';
import { ExaminationEntity } from './examination.entity';

@Entity({ name: Database.Table.Exam })
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn({
    readonly: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ default: 'Toeic' })
  subjectVal: SubjectVal;

  @Column({ default: 'Practice' })
  examType: ExamType;

  @Column({ default: 'MultiChoice' })
  questionType: QuestionType;

  @Column({ default: 'reading' })
  section: Section;

  @Column({ default: 'reading-specific-1' })
  part: Part;

  @Column('json', { default: { 'Topic 1': ['Topic 1'] } })
  topics: Topic[];

  @Column({ default: 'Beginner' })
  level: Level;

  @Column({ default: 10 })
  duration?: number;

  @Column({ default: 10 })
  amount?: number;

  @Column('json')
  @OneToMany(() => ExamQuestionEntity, (examQuestion) => examQuestion.exam)
  examQuestions: ExamQuestionEntity[];

  @Column('json', { nullable: true })
  @OneToOne(() => ExaminationEntity, (examination) => examination.exam)
  examinations?: Examination[];

  @ManyToOne(() => UserEntity, (user) => user.exams)
  user: UserEntity;
}
