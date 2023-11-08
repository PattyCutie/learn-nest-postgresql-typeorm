import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserProfileDal } from '../dal/user-profile.dal';
import { UserDal } from 'src/modules/user/dal/user.dal';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { HttpResponse } from 'src/interface/http-response.interface';
import { UserProfile } from '../interface/user-profile.interface';
import responseConfig from 'src/config/response.config';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);
  constructor(private readonly userProfileDal: UserProfileDal) {}

  async userCreateUserProfile(
    userId: string,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<HttpResponse<UserProfile>> {
    try {
      const userProfile = await this.userProfileDal.userCreateUserProfile(
        userId,
        createUserProfileDto,
      );
      this.logger.log(
        `Successfully created user profile with user id: ${userId}`,
      );
      this.logger.debug(JSON.stringify(userProfile));
      return {
        statusCode: responseConfig.SUCCESS_CREATE.statusCode,
        message: responseConfig.SUCCESS_CREATE.message,
        data: userProfile,
      };
    } catch (error) {
      this.logger.error(`Failed to create user profile`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllUserProfile(): Promise<HttpResponse<UserProfile[]>> {
    try {
      const userProfile = await this.userProfileDal.getAllUserProfile();

      if (userProfile.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all user's Profile from database`);
      this.logger.debug(JSON.stringify(userProfile.length));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: userProfile,
      };
    } catch (error) {
      this.logger.error(`Failed to get user's profile from database`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserProfileById(
    id: string,
  ): Promise<HttpResponse<UserProfile | null>> {
    try {
      const userProfile = await this.userProfileDal.getUserProfileById(id);

      if (!userProfile) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get user's profile with id: ${id}`);
      this.logger.debug(JSON.stringify(userProfile));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: userProfile,
      };
    } catch (error) {
      this.logger.error(`Failed to get user's Profile`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async updateUserProfileById(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<HttpResponse<UserProfile>> {
    try {
      const userProfile = await this.userProfileDal.updateUserProfileById(
        id,
        updateUserProfileDto,
      );

      if (!userProfile) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully update user profile id: ${id}`);
      this.logger.debug(JSON.stringify(userProfile));
      return {
        statusCode: responseConfig.SUCCESS_UPDATED.statusCode,
        message: responseConfig.SUCCESS_UPDATED.message,
        data: userProfile,
      };
    } catch (error) {
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async deleteUserProfileById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const user = await this.userProfileDal.deleteUserProfileById(id);

      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`SuccessFully deleted user profile id: ${id}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS_DELETE.statusCode,
        message: responseConfig.SUCCESS_DELETE.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed tp delete user with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
