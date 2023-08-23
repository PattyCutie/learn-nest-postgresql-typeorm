import { Database } from 'src/config/db.config';
import { Level } from 'src/types/exam.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ExamProgressEntity } from './exam-progress.entity';

@Entity({ name: Database.Table.ExamDetails })
export class ExamDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column()
  topic: string;

  @Column()
  examLevel: Level;

  @Column()
  skillPart: string;

  @OneToOne(
    () => ExamProgressEntity,
    (examProgress) => examProgress.examDetails,
  )
  @JoinColumn()
  examProgress: ExamProgressEntity;
}
