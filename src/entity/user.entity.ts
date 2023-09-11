import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Database } from 'src/config/db.config';
import { hashPassword } from 'src/utils/hash.utils';
import { ExamEntity } from './exam.entity';
import { ExamQuestionEntity } from './examQuestion.entity';

@Entity({ name: Database.Table.User })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    readonly: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  lastActive?: Date;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password.startsWith('$2')) {
      this.password = await hashPassword(this.password);
    }
  }

  @OneToMany(() => ExamEntity, (exams) => exams.user)
  exams: ExamEntity[];

  @ManyToMany(() => ExamQuestionEntity, (examQuestions) => examQuestions.user, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_examQuestions',
  })
  examQuestions: ExamQuestionEntity[];
}
