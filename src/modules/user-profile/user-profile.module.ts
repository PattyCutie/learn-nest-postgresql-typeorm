import { Module } from '@nestjs/common';
import { UserProfileController } from './controller/user-profile.controller';
import { UserProfileService } from './service/user-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserProfileEntity } from './entity/user-profile.entity';
import { UserProfileDal } from './dal/user-profile.dal';
import { UserModule } from '../user/user.module';
import { UserDal } from '../user/dal/user.dal';
import { UserService } from '../user/service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfileEntity, UserEntity]),
    UserModule,
  ],
  providers: [UserProfileDal, UserProfileService, UserDal, UserService],
  controllers: [UserProfileController],
  exports: [UserProfileDal, UserProfileService],
})
export class UserProfileModule {}
