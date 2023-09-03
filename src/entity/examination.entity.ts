import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnswerSheetEntity } from './answerSheet.entity';
import { Database } from 'src/config/db.config';
import { ExamEntity } from './exam.entity';

@Entity({ name: Database.Table.Examination })
export class ExaminationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  examId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date;

  @ManyToOne(() => ExamEntity, (exam) => exam.examinations)
  exam: ExamEntity[];

  @Column('json')
  @OneToMany(() => AnswerSheetEntity, (answerSheet) => answerSheet.examination)
  answerSheets: AnswerSheetEntity[];

  @ManyToOne(() => UserEntity, (user) => user.examinations)
  user: UserEntity;
}
