import { Database } from 'src/config/db.config';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamDetailsEntity } from './exam-details.entity';
import { UserChoiceEntity } from './user-choice.entity';
import { UserAnalyticsEntity } from './user-analytic.entity';
import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';
import { QuestionEntity } from './question.entity';

@Entity({ name: Database.Table.ExamProgress })
export class ExamProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  examId: string;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column({ type: 'timestamp' })
  submittedAt: Date;

  @Column()
  amountOfQA: number;

  @Column()
  timeSpent: number;

  @Column()
  totalPoints: number;

  @OneToMany(() => QuestionEntity, (questions) => questions.examProgress, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => UserChoiceEntity, (userChoice) => userChoice.examProgress, {
    cascade: true,
  })
  userChoices: UserChoiceEntity[];

  @ManyToOne(() => UserEntity, (user) => user.examProgresses)
  user: UserEntity;

  @ManyToOne(() => ExamEntity, (exam) => exam.examProgress)
  exam: ExamEntity;

  @OneToOne(() => ExamDetailsEntity, (examDetails) => examDetails.examProgress)
  @JoinColumn()
  examDetails: ExamDetailsEntity;

  @ManyToOne(
    () => UserAnalyticsEntity,
    (userAnalytics) => userAnalytics.examProgresses,
  )
  userAnalytics: UserAnalyticsEntity;
}
