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

  @Column('timestamp')
  timeStart?: Date;

  @Column('timestamp')
  timeAnswer?: Date;

  @Column({ type: 'varchar', nullable: true })
  selectedChoice?: string;

  @Column('boolean')
  isCorrect?: boolean;

  @ManyToOne(
    () => ExaminationEntity,
    (examination) => examination.answerSheets,
    { cascade: true },
  )
  examination: ExaminationEntity;
}
