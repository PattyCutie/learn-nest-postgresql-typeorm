import { Module } from '@nestjs/common';
import { UserDal } from './dal/user.dal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserDal],
  controllers: [UserController],
  exports: [UserService, UserDal],
})
export class UserModule {}
