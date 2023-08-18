import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CommentService],
})
export class UsersModule {}
