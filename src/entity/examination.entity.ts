import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnswerSheetEntity } from './answerSheet.entity';
import { Database } from 'src/config/db.config';
import { ExamEntity } from './exam.entity';

@Entity({ name: Database.Table.Examination })
export class ExaminationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'uuid', nullable: false })
  // userId: string;

  @Column({ type: 'uuid', nullable: false })
  examId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt?: Date;

  @OneToMany(() => AnswerSheetEntity, (answerSheet) => answerSheet.examination)
  answerSheets?: AnswerSheetEntity[];
}
