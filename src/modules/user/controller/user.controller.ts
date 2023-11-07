import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Version,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import { HttpResponse } from 'src/interface/http-response.interface';
import { UpdateUsernameDto } from '../dto/update-username.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpResponse<IUser>> {
    return this.userService.createUser(createUserDto);
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<HttpResponse<IUser[]>> {
    return this.userService.getAllUsers();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<HttpResponse<IUser>> {
    return this.userService.getUserById(id);
  }

  @Version('1')
  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<HttpResponse<IUser>> {
    return this.userService.getUserByUsername(username);
  }

  @Version('1')
  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<HttpResponse<IUser>> {
    return this.userService.getUserByEmail(email);
  }

  @Version('1')
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUsernameById(
    @Param('id') id: string,
    @Body() updateUsernameDto: UpdateUsernameDto,
  ): Promise<HttpResponse<IUser>> {
    return this.userService.updateUsernameById(id, updateUsernameDto);
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExamById(
    @Param('id') id: string,
  ): Promise<HttpResponse<boolean>> {
    return this.userService.deleteUserById(id);
  }
}
