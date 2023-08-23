import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ExamProgressEntity } from './exam-progress.entity';
import { Level } from 'src/types/exam.type';
import { Database } from 'src/config/db.config';
import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';

@Entity({ name: Database.Table.UserAnalytics })
export class UserAnalyticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToMany(
    () => ExamProgressEntity,
    (examProgress) => examProgress.userAnalytics,
    { cascade: true },
  )
  examProgresses: ExamProgressEntity[];

  @Column('simple-array')
  performanceTrendsOverTime: number[];

  @Column()
  averageTimeSpentOnEachQuestion: number;

  @Column('simple-array')
  successRateForEachQuestion: number[];

  @Column()
  comparisonWithOtherUsersPerformance: number;

  @Column('jsonb')
  totalScoreSubject: Record<string, number>;

  @Column('jsonb')
  totalScoreSkillPart: Record<string, number>;

  @Column('jsonb')
  totalScoreExamLevel: Record<Level, number>;

  @Column()
  overallPercentagePerformance: number;

  @OneToMany(() => ExamEntity, (ExamEntity) => ExamEntity.user, {
    cascade: true,
  })
  exam: ExamEntity[];

  @OneToOne(() => UserEntity, (user) => user.userAnalytics)
  @JoinColumn()
  user: UserEntity;
}
