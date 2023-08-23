import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ExamEntity } from './exam.entity'; // Import the Exam entity
import { Database } from 'src/config/db.config';
import { ExamProgressEntity } from './exam-progress.entity';

@Entity({ name: Database.Table.Question })
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examId: string;

  @Column()
  question: string;

  @Column('text', { array: true })
  choices: string[];

  @Column()
  correctAnswer: string;

  @ManyToOne(() => ExamProgressEntity, (examProgress) => examProgress.question)
  examProgress: ExamProgressEntity;
}
