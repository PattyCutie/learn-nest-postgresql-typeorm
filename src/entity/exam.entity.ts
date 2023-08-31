import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/exam.type';
import { Database } from 'src/config/db.config';
import { UserEntity } from './user.entity';
import { QuestionResDto } from 'src/modules/exam/dto/exam.dto';

@Entity({ name: Database.Table.Exam })
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn({
    readonly: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  totalTime: number;

  @Column({ default: 'Practice' })
  examType: ExamType;

  @Column()
  questionTypes: QuestionType;

  @Column({ default: 'Toeic' })
  subjectVal: SubjectVal;

  @Column({ default: 'Toeic' })
  section: Section;

  @Column({ default: 'reading-specific-1' })
  part: Part;

  @Column('json', { default: {} })
  topics: { [key: string]: Topic[] };

  @Column({ default: 'Beginner' })
  level: Level;

  @Column({ default: 10 })
  duration?: number;

  @Column({ default: 10 })
  amount?: number;

  //Here is the logic to create the question in the exam
  // need to fix
  @Column('json', { nullable: true })
  examResponse?: QuestionResDto[];
  ///
  @OneToMany(() => QuestionEntity, (question) => question.exam)
  @JoinColumn({ name: 'question' })
  questions: QuestionEntity;

  @ManyToOne(() => UserEntity, (user) => user.exams)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
