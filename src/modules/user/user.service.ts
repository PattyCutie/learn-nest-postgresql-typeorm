import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserDal } from './user.dal';
import { HttpResponse } from 'src/types/http-response';
import responseConfig from 'src/config/response.config';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userDal: UserDal) {}

  async createUser(createUserDto: CreateUserDto): Promise<HttpResponse<void>> {
    try {
      const userData = await this.userDal.createUser(createUserDto);
      const { examProgresses, userAnalytics, password, ...result } = userData;

      this.logger.log('Successfully saved new user to database');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS_CREATE.statusCode,
        message: responseConfig.SUCCESS_CREATE.message,
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
  async getAllUsers(): Promise<HttpResponse<void>> {
    try {
      const result = await this.userDal.getAllUser();
      if (result.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      const userData = result.map((user) => {
        const { password, ...userData } = user;
        return userData;
      });
      this.logger.log('Successfully get all users from database');
      this.logger.debug(JSON.stringify(userData));
    } catch (error) {
      this.logger.error('Failed to get all users from database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getUserById(id: string): Promise<HttpResponse<void>> {
    try {
      const userData = await this.userDal.getUserById(id);
      if (!userData) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }

      const { examProgresses, userAnalytics, password, ...result } = userData;

      this.logger.log(`Successfully get user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {}
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<HttpResponse<void>> {
    try {
      const updateUserData = await this.userDal.getUserById(id);
      if (!updateUserData) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }

      await this.userDal.updateUserById(id, updateUserDto);
      const { examProgresses, userAnalytics, password, exam, ...result } =
        updateUserData;

      this.logger.log(`Successfully update user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
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

  async deleteUserById(id: string): Promise<HttpResponse<void>> {
    try {
      const userData = await this.userDal.getUserById(id);
      if (!userData) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      await this.userDal.deleteUserById(id);
      const { examProgresses, userAnalytics, password, created_at, ...result } =
        userData;
      this.logger.log(`Successfully deleted user from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
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
