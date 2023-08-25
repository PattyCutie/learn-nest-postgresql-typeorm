import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { hashPassword } from 'src/utils/hash.utils';

export class UserDal {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepo.create(createUserDto);
    const createdUser = await this.userRepo.save(newUser);
    return createdUser;
  }

  async getAllUser(): Promise<UserEntity[]> {
    const allUsers = await this.userRepo.find({
      order: {
        created_at: 'ASC',
      },
    });
    return allUsers;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    return user;
  }

  async updateUserById(
    id: string,
    updatedUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      return null;
    }

    if (updatedUserDto.password) {
      const updatedPassword = await hashPassword(updatedUserDto.password);
      user.password = updatedPassword;
    }

    if (updatedUserDto.username) {
      user.username = updatedUserDto.username;
    }

    await this.userRepo.save(user);

    return user;
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
