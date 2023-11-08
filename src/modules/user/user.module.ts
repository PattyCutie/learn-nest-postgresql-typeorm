import { Module } from '@nestjs/common';
import { UserDal } from './dal/user.dal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserProfileDal } from '../user-profile/dal/user-profile.dal';
import { UserProfileService } from '../user-profile/service/user-profile.service';
import { UserProfileEntity } from '../user-profile/entity/user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  providers: [UserService, UserDal, UserProfileDal, UserProfileService],
  controllers: [UserController],
  exports: [UserService, UserDal],
})
export class UserModule {}
