import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import { HttpResponse } from 'src/interface/http-response.interface';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UserProfile } from '../interface/user-profile.interface';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Version('1')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async userCreateUserProfile(
    @Param('userId') userId: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ): Promise<HttpResponse<UserProfile>> {
    return this.userProfileService.userCreateUserProfile(
      userId,
      createUserProfileDto,
    );
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUserProfile(): Promise<HttpResponse<UserProfile[]>> {
    return this.userProfileService.getAllUserProfile();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserProfileById(
    @Param('id') id: string,
  ): Promise<HttpResponse<UserProfile>> {
    return this.userProfileService.getUserProfileById(id);
  }

  @Version('1')
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUserProfileById(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<HttpResponse<UserProfile>> {
    return this.userProfileService.updateUserProfileById(
      id,
      updateUserProfileDto,
    );
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserProfileById(
    @Param('id') id: string,
  ): Promise<HttpResponse<boolean>> {
    return this.userProfileService.deleteUserProfileById(id);
  }
}
