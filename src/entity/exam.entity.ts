import { Database } from 'src/config/db.config';
import {
  ExamType,
  Level,
  Part,
  Question,
  QuestionType,
  Section,
  Subject,
} from 'src/types/exam.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ExamProgress } from 'src/types/user-analytic';
import { ExamProgressEntity } from './exam-progress.entity';

@Entity({ name: Database.Table.Exam })
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  examType: ExamType;

  @Column()
  subject: Subject;

  @Column()
  section: Section;

  @Column()
  part: Part;

  @Column()
  topic: Part;

  @Column()
  level: Level;

  @Column()
  questionTypes: QuestionType;

  @Column()
  duration: number;

  @Column()
  amount: number;

  @Column('text', { array: true })
  questions: Question[];

  @OneToMany(() => ExamProgressEntity, (examProgress) => examProgress.exam)
  examProgress: ExamProgress[];

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.exam)
  user: UserEntity;
}
