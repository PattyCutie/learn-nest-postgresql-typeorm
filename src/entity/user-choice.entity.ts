import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExamProgressEntity } from './exam-progress.entity';
import { IsCorrectChoice } from 'src/types/user-analytic';
import { Database } from 'src/config/db.config';

@Entity({ name: Database.Table.UserChoice })
export class UserChoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examId: string;

  @Column()
  questionId: number;

  @Column()
  choice: string;

  @Column({ type: 'boolean', nullable: true })
  isCorrect: IsCorrectChoice;

  @ManyToOne(
    () => ExamProgressEntity,
    (examProgress) => examProgress.userChoices,
  )
  examProgress: ExamProgressEntity;
}
