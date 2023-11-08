import { Database } from 'src/config/db.config';
import { UserProfileEntity } from 'src/modules/user-profile/entity/user-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
// import * as bcrypt from 'bcrypt';

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
  lastActive: Date;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false })
  password: string;

  // Move to service.ts
  // @BeforeInsert()
  // async hashPassword() {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(this.password, salt);
  //   this.password = hashedPassword;
  // }

  @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user)
  userProfile: UserProfileEntity;
}
