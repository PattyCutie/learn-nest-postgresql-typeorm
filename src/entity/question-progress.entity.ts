import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamProgressEntity } from './exam-progress.entity';
import { Database } from 'src/config/db.config';

@Entity({ name: Database.Table.QuestionProgress })
export class QuestionProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  selectedChoice: string | null;

  @Column()
  isCorrect: boolean;

  @Column()
  pointsEarned: number;

  @Column()
  timeTaken: number;

  @ManyToOne(
    () => ExamProgressEntity,
    (examProgress) => examProgress.questionProgress,
  )
  examProgress: ExamProgressEntity;
}
