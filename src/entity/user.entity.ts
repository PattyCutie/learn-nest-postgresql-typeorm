import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Database } from 'src/config/db.config';
import { hashPassword } from 'src/utils/hash.utils';
import { ExamEntity } from './exam.entity';

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

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }

  @OneToMany(() => ExamEntity, (exam) => exam.user)
  exams: ExamEntity[];
}
