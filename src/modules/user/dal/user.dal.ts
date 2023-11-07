import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { IUser } from '../interface/user.interface';
import { UpdateUsernameDto } from '../dto/update-username.dto';

export class UserDal {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (user)
      throw new ConflictException(
        `Email is duplicated, Please try again with new email`,
      );

    const newUser = this.userRepo.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });

    const saveUser = await this.userRepo.save(newUser);
    const { password, ...userData }: IUser = saveUser;
    return userData as IUser;
  }

  async getAllUser(): Promise<IUser[]> {
    const users = await this.userRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });

    if (users.length === 0) {
      throw new NotFoundException(`Users not Found`);
    }

    const result: IUser[] = users.map((user) => {
      const { password, ...userData }: IUser = user;
      return userData as IUser;
    });

    return result;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const { password, ...userData }: IUser = user;

    return userData as IUser;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User with Username: ${username} not found`);
    }

    const { password, ...userData }: IUser = user;

    return userData as IUser;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    const { password, ...userData }: IUser = user;

    return userData as IUser;
  }

  async updateUsernameById(
    id: string,
    updateUsernameDto: UpdateUsernameDto,
  ): Promise<IUser> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const result = await this.userRepo.save({
      id,
      ...updateUsernameDto,
    });

    return result as IUser;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const result = await this.userRepo.delete({ id });

    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}
