import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { ExamService } from '../exam/exam.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly examService: ExamService,
  ) {}

  @Get()
  findAll() {
    return 'This is get all user';
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id/exams')
  getUserExam(@Param('id') id: string) {
    return this.examService.findExamOfUser(id);
  }
}
