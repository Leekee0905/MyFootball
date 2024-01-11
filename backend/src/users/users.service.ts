import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    nickname: string,
    id: string,
    password: string,
    email: string,
    birthday: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      id,
      name,
      password: hashedPassword,
      email,
      nickname,
      birthday,
    });
    return await this.userRepository.save(newUser);
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (user) {
      throw new BadRequestException('중복된 아이디입니다.');
    }
    return user;
  }
  async findOneByNickname(nickname: string) {
    const user = await this.userRepository.findOne({
      where: { nickname },
      withDeleted: true,
    });
    if (nickname) {
      throw new BadRequestException('중복된 닉네임입니다.');
    }
    return user;
  }
}
