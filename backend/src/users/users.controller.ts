// users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('nickname') nickname: string,
    @Body('id') id: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('birthday') birthday: string,
  ): Promise<any> {
    try {
      const newUser = await this.usersService.createUser(
        name,
        nickname,
        id,
        password,
        email,
        birthday,
      );
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
