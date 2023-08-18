import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly useService: UserService,
    private readonly commentService: CommentService,
  ) {}

  // @Get(':id')
  // findAll(@Param('id') id: string) {
  //   return {
  //     user: {
  //       id: id,
  //     },
  //   };
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.useService.findOne(id);
  }

  @Get(':id/comments')
  getUserComment(@Param('id') id: string) {
    return this.commentService.findUserComments(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

  // @Patch()
  // @Put()
  // @Delete()
}
