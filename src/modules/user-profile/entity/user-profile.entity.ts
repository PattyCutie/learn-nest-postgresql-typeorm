import { Database } from 'src/config/db.config';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: Database.Table.UserProfile })
export class UserProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    readonly: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  fname: string;

  @Column({ nullable: true })
  lname: string;

  @OneToOne(() => UserEntity, (user) => user.userProfile, {
    cascade: true,
  })
  @JoinColumn()
  user: UserEntity;
}
