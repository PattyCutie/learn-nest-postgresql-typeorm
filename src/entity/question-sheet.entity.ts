import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Database } from 'src/config/db.config';
import { ExaminationEntity } from './examination.entity';
import { Examination } from 'src/types/examination.type';

@Entity({ name: Database.Table.QuestionSheet })
export class QuestionSheetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timeStart: Date;

  @Column()
  timeAnswer: Date;

  @Column()
  level: string;

  @Column()
  part: string;

  @Column('jsonb')
  topics: Record<string, string[]>;

  @Column()
  question: string;

  @Column('simple-array')
  choices: string[];

  @Column()
  selectedChoice: string | null;

  @Column()
  correctAnswer: string;

  @Column()
  explainationEn: string;

  @Column()
  explainationTh: string;

  @ManyToOne(
    () => ExaminationEntity,
    (examination) => examination.questionSheet,
  )
  examination: Examination;
}
