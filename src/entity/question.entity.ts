import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExamEntity } from './exam.entity';
import { Level, Topic } from 'src/types/exam.type';
import { Database } from 'src/config/db.config';

@Entity({ name: Database.Table.Question })
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: Level;

  @Column()
  part: string;

  @Column('jsonb')
  topics: { [key: string]: Topic[] };

  @Column()
  question: string;

  @Column('text', { array: true })
  choices: string[];

  @Column()
  correctAnswer: string;

  @Column()
  explainationEn: string;

  @Column()
  explainationTh: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.examResponse)
  exam: ExamEntity;
}
