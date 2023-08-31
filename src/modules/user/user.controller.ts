import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  HttpCode,
  Version,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { HttpResponse } from 'src/types/http-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpResponse<CreateUserDto>> {
    return this.userService.createUser(createUserDto);
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<HttpResponse<{ users: CreateUserDto[] }>> {
    return this.userService.getAllUsers();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param('id') id: string,
  ): Promise<HttpResponse<{ users: CreateUserDto }>> {
    return this.userService.getUserById(id);
  }

  @Version('1')
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<HttpResponse<{ users: CreateUserDto }>> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExamById(
    @Param('id') id: string,
  ): Promise<HttpResponse<boolean>> {
    return this.userService.deleteUserById(id);
  }

  //One To Many with Exams
  // @Version('1')
  // @Get(':id/exams')
  // getUserExam(@Param('id') id: string) {
  //   return this.examService.findExamOfUser(id);
  // }
}
