import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';

export class UserDal {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newUser = this.userRepo.create(createUserDto);
    const createdUser = await this.userRepo.save(newUser);
    const { password, ...userData }: CreateUserDto = createdUser;
    return userData as CreateUserDto;
  }

  async getAllUser(): Promise<CreateUserDto[]> {
    const allUsers = await this.userRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });
    const result: CreateUserDto[] = allUsers.map((user) => {
      const { password, ...userData }: CreateUserDto = user;
      return userData as CreateUserDto;
    });

    return result;
  }

  async getUserById(id: string): Promise<CreateUserDto | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    const { password, ...userData }: CreateUserDto = user;

    return userData as CreateUserDto;
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }
    const { password, ...userData }: CreateUserDto = user;
    const result = await this.userRepo.save({
      ...userData,
      ...updateUserDto,
    });
    return result as CreateUserDto;
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
