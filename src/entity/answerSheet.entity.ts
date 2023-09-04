import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExaminationEntity } from './examination.entity';
import { Database } from 'src/config/db.config';

@Entity({ name: Database.Table.AnswerSheet })
export class AnswerSheetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  examinationId: string;

  @Column('uuid')
  questionId: string;

  @Column({ type: 'timestamp', nullable: true })
  timeStart?: Date;

  @Column({ type: 'timestamp', nullable: true })
  timeAnswer?: Date;

  @Column({ nullable: true })
  selectedChoice?: string;

  @Column({ type: 'boolean', nullable: true })
  isCorrect?: boolean;

  @ManyToOne(() => ExaminationEntity, (examination) => examination.answerSheets)
  examination: ExaminationEntity;
}
