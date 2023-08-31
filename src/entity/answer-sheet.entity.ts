import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExaminationEntity } from './examination.entity';
import { Database } from 'src/config/db.config';
import { Topic } from 'src/types/exam.type';

@Entity({ name: Database.Table.AnswerSheet })
export class AnswerSheetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  examinationId: string;

  @Column()
  timeStart: Date;

  @Column()
  timeAnswer: Date;

  @Column()
  level: string;

  @Column()
  part: string;

  @Column('json')
  topics: Topic[];

  @Column()
  question: string;

  @Column('json')
  choices: string[];

  @Column({ nullable: true })
  selectedChoice?: string | null;

  @ManyToOne(() => ExaminationEntity, (examination) => examination.answerSheet)
  @JoinColumn({ name: 'examinationId' })
  examination: ExaminationEntity;
}
