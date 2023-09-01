import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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
} from 'src/types/question-option.type';
import { Database } from 'src/config/db.config';
import { UserEntity } from './user.entity';
import { QuestionResDto } from 'src/modules/exam/dto/exam.dto';

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

  @Column()
  questionTypes: QuestionType;

  @Column({ default: 'Toeic' })
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
  @OneToMany(() => QuestionEntity, (question) => question.exam, {
    cascade: true,
  })
  examQuestions: QuestionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.exams)
  user: UserEntity;
}
