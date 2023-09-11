import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUsernameDto } from './dto/createUserDto';
import { IUser } from 'src/types/user.type';

export class UserDal {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = this.userRepo.create(createUserDto);
    const createdUser = await this.userRepo.save(newUser);
    const { password, ...userData }: CreateUserDto = createdUser;
    return userData as IUser;
  }

  async getAllUser(): Promise<IUser[]> {
    const allUsers = await this.userRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });
    const result: IUser[] = allUsers.map((user) => {
      const { password, ...userData }: CreateUserDto = user;
      return userData as IUser;
    });

    return result;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      return null;
    }
    const { password, ...userData }: CreateUserDto = user;

    return userData as IUser;
  }

  async updateUserById(
    id: string,
    updateUsernameDto: UpdateUsernameDto,
  ): Promise<IUser> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }
    const result = await this.userRepo.save({
      id,
      ...updateUsernameDto,
    });
    return result as IUser;
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
