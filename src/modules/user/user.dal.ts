import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';

export class UserDal {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepo.create(createUserDto);
    const createdUser = await this.userRepo.save(newUser);
    const { password, ...userData }: UserEntity = createdUser;
    return userData as UserEntity;
  }

  async getAllUser(): Promise<UserEntity[]> {
    const allUsers = await this.userRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });

    const result: UserEntity[] = allUsers.map((user) => {
      const { password, ...userData } = user;
      return userData as UserEntity;
    });

    return result;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    const { password, ...userData } = user;
    const result = await this.userRepo.save({
      ...userData,
    });

    return result;
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
    const { password, ...userData } = user;
    const result = await this.userRepo.save({
      ...userData,
      ...updatedUserDto,
    });
    return result;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const result = await this.userRepo.delete({
      id,
    });
    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}
