import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Database } from 'src/config/db.config';
import { UserAnalyticsEntity } from './user-analytic.entity';
import { ExamEntity } from './exam.entity';
import { ExamProgressEntity } from './exam-progress.entity';

@Entity({ name: Database.Table.User })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => ExamEntity, (exam) => exam.user)
  exam: ExamEntity[];

  @OneToMany(() => ExamProgressEntity, (examProgress) => examProgress.user)
  examProgresses: ExamProgressEntity[];

  @OneToOne(() => UserAnalyticsEntity, (userAnalytics) => userAnalytics.user)
  @JoinColumn()
  userAnalytics: UserAnalyticsEntity;
}
