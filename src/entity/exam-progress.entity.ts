import { Grade } from 'src/types/exam.progress.type';
import { ExamType } from 'src/types/exam.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { QuestionProgressEntity } from './question-progress.entity';
import { Database } from 'src/config/db.config';
import { UserEntity } from './user.entity';

@Entity({ name: Database.Table.ExamProgress })
export class ExamProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  examId: string;

  @Column()
  examType: ExamType;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column()
  totalTimeTaken: number;

  @Column()
  totalPoints: number;

  @Column()
  isFininshed: boolean;

  @Column()
  grade: Grade;

  @ManyToOne(() => UserEntity, (user) => user.examProgress)
  user: UserEntity;

  @OneToMany(
    () => QuestionProgressEntity,
    (questionProgress) => questionProgress.examProgress,
  )
  questionProgress?: QuestionProgressEntity[];
}
