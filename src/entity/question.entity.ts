import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Database } from 'src/config/db.config';
import { ExamProgressEntity } from './exam-progress.entity';
import { Level } from 'src/types/exam.type';

@Entity({ name: Database.Table.Question })
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examId: string;

  @Column()
  level: Level;

  @Column()
  question: string;

  @Column('text', { array: true })
  choices: string[];

  @Column()
  correctAnswer: string;

  @ManyToOne(() => ExamProgressEntity, (examProgress) => examProgress.questions)
  examProgress: ExamProgressEntity;
}
