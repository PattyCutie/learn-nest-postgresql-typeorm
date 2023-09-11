import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUsernameDto } from './dto/createUserDto';
import { UserDal } from './user.dal';
import { HttpResponse } from 'src/types/http-response';
import responseConfig from 'src/config/response.config';
import { hashPassword } from 'src/utils/hash.utils';
import { IUser } from 'src/types/user.type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userDal: UserDal) {}

  async createUser(createUserDto: CreateUserDto): Promise<HttpResponse<IUser>> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const data = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    };

    try {
      const userData = await this.userDal.createUser(data);

      this.logger.log('Successfully saved new user to database');
      this.logger.debug(JSON.stringify(userData));
      return {
        statusCode: responseConfig.SUCCESS_CREATE.statusCode,
        message: responseConfig.SUCCESS_CREATE.message,
        data: userData,
      };
    } catch (error) {
      this.logger.error('Failed to save user request to database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllUsers(): Promise<HttpResponse<IUser[]>> {
    try {
      const allUsers = await this.userDal.getAllUser();

      if (allUsers.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log('Successfully get all users from database');
      this.logger.debug(`Number of users: ${allUsers.length}`);
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: allUsers,
      };
    } catch (error) {
      this.logger.error('Failed to get all users from database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserById(id: string): Promise<HttpResponse<IUser>> {
    try {
      const userById = await this.userDal.getUserById(id);
      if (!userById) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(userById));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
        data: userById,
      };
    } catch (error) {
      this.logger.error(`Failed to get user from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async updateUserById(
    id: string,
    updateUsernameDto: UpdateUsernameDto,
  ): Promise<HttpResponse<IUser>> {
    try {
      const updateUserById = await this.userDal.updateUserById(
        id,
        updateUsernameDto,
      );
      if (!updateUserById) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully update user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(updateUserById));
      return {
        statusCode: responseConfig.SUCCESS_UPDATED.statusCode,
        message: responseConfig.SUCCESS_UPDATED.message,
        data: updateUserById,
      };
    } catch (error) {
      this.logger.error(`Failed to update user from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async deleteUserById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const userData = await this.userDal.deleteUserById(id);
      if (!userData) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully deleted user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(userData));
      return {
        statusCode: responseConfig.SUCCESS_DELETE.statusCode,
        message: responseConfig.SUCCESS_DELETE.message,
        data: userData,
      };
    } catch (error) {
      this.logger.error(`Failed to delete exam from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
