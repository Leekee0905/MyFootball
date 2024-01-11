import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async validateUser(
    @Body('id') id: string,
    @Body('password') password: string,
  ): Promise<any> {
    const logined = await this.authService.validateUser(id, password);
    if (logined) {
      return {
        status: 'success',
      };
    }
  }
}
