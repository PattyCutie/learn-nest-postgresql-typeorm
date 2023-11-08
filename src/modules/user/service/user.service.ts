import { Injectable, Logger } from '@nestjs/common';
import responseConfig from 'src/config/response.config';
import { HttpResponse } from 'src/interface/http-response.interface';
import { UserDal } from '../dal/user.dal';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import { UpdateUsernameDto } from '../dto/update-username.dto';
import { UserProfile } from 'src/modules/user-profile/interface/user-profile.interface';
import { UserProfileDal } from 'src/modules/user-profile/dal/user-profile.dal';
import { UpdateUserProfileDto } from 'src/modules/user-profile/dto/update-user-profile.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userDal: UserDal) {}

  async createUser(createUserDto: CreateUserDto): Promise<HttpResponse<IUser>> {
    try {
      const user = await this.userDal.createUser(createUserDto);

      this.logger.log(`Successfully saved new user to database`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS_CREATE.statusCode,
        message: responseConfig.SUCCESS_CREATE.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to save new user to database`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllUsers(): Promise<HttpResponse<IUser[]>> {
    try {
      const users = await this.userDal.getAllUser();

      if (users.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all users`);
      this.logger.debug(`Number of users: ${users.length}`);
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: users,
      };
    } catch (error) {
      this.logger.error(`Failed to get all users`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserById(id: string): Promise<HttpResponse<IUser>> {
    try {
      const user = await this.userDal.getUserById(id);

      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`SuccessFully get user by id: ${id}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to get user by id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserByUsername(username: string): Promise<HttpResponse<IUser>> {
    try {
      const user = await this.userDal.getUserByUsername(username);
      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get user by username : ${username}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to get user by username : ${username}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserByEmail(email: string): Promise<HttpResponse<IUser>> {
    try {
      const user = await this.userDal.getUserByEmail(email);
      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get user by email: ${email}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to get user by email : ${email}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async updateUsernameById(
    id: string,
    updateUsernameById: UpdateUsernameDto,
  ): Promise<HttpResponse<IUser>> {
    try {
      const user = await this.userDal.updateUsernameById(
        id,
        updateUsernameById,
      );
      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully update user id : ${id}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS_UPDATED.statusCode,
        message: responseConfig.SUCCESS_UPDATED.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to update user id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async deleteUserById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const user = await this.userDal.deleteUserById(id);
      if (!user) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully deleted user with id: ${id}`);
      this.logger.debug(JSON.stringify(user));
      return {
        statusCode: responseConfig.SUCCESS_DELETE.statusCode,
        message: responseConfig.SUCCESS_DELETE.message,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to delete user with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  //User Profile by User id
  async getAllUserWithUserProfile(): Promise<HttpResponse<IUser[]>> {
    try {
      const users = await this.userDal.getAllUserWithUserProfile();

      if (users.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all users`);
      this.logger.debug(`Number of users: ${users.length}`);
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: users,
      };
    } catch (error) {
      this.logger.error(`Failed to get all users`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserProfileByUserId(
    id: string,
  ): Promise<HttpResponse<UserProfile | null>> {
    try {
      const userProfile = await this.userDal.getUserProfileByUserId(id);

      if (!userProfile) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }

      this.logger.log(`Successfully get user's profile for user's id: ${id}`);
      this.logger.debug(JSON.stringify(userProfile));
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

  async updateUserProfileByUserId(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<HttpResponse<UserProfile | null>> {
    try {
      const userWithProfile = await this.userDal.updateUserProfileByUserId(
        id,
        updateUserProfileDto,
      );

      if (!userWithProfile) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }

      this.logger.log(`Successfully get user's profile for user's id: ${id}`);
      this.logger.debug(JSON.stringify(userWithProfile));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: userWithProfile,
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
}
