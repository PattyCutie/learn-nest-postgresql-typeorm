import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
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
  Part: Part;

  @Column({ default: 'Topic 1' })
  topic: Topic;

  @Column({ default: 'Beginner' })
  level: Level;

  @Column({ default: 10 })
  duration?: number;

  @Column({ default: 10 })
  amount?: number;

  @OneToMany(() => QuestionEntity, (question) => question.exam)
  examResponse?: QuestionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.exam)
  user: UserEntity;
}
