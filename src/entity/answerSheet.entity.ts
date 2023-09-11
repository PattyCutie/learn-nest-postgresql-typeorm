import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExaminationEntity } from './examination.entity';
import { Database } from 'src/config/db.config';
import { ExamQuestionEntity } from './examQuestion.entity';

@Entity({ name: Database.Table.AnswerSheet })
export class AnswerSheetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  examinationId: string;

  @Column({ type: 'uuid', nullable: false })
  questionId: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  timeStart?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timeAnswer?: Date;

  @Column({ nullable: true })
  selectedChoice?: string;

  @Column({ nullable: true })
  isCorrect?: number;

  @ManyToOne(
    () => ExaminationEntity,
    (examination) => examination.answerSheets,
    { onDelete: 'CASCADE' },
  )
  examination: ExaminationEntity;
}
