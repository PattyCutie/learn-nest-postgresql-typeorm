import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
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
import { hashPassword } from 'src/utils/hash.utils';

@Entity({ name: Database.Table.User })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    readonly: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, unique: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }

  @OneToMany(() => ExamEntity, (exam) => exam.user)
  exam: ExamEntity[];

  @OneToMany(() => ExamProgressEntity, (examProgress) => examProgress.user)
  examProgresses: ExamProgressEntity[];

  @OneToOne(() => UserAnalyticsEntity, (userAnalytics) => userAnalytics.user)
  @JoinColumn()
  userAnalytics: UserAnalyticsEntity;
}
