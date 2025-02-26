import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/public';
import { LoginDto } from './dto/login-dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @HttpCode(200)
  @Public()
  async login(
    @Body(ValidationPipe) body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.userService.login(body, response);
    return {
      data: {
        token,
      },
      code: '200',
      message: 'success',
    };
  }
  @Post('/register')
  // @Public()
  register(@Body(ValidationPipe) body: LoginDto, @Req() req) {
    return this.userService.register(body, req);
  }
}
