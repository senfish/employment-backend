import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { Response } from 'express';
import * as crypto from 'crypto';

const md5 = (str) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  @InjectRepository(User)
  private usesRepository: Repository<User>;
  async login(body: LoginDto, response: Response) {
    const target = await this.usesRepository.findOneBy({
      username: body.username,
    });
    if (!target) {
      throw new HttpException(
        {
          code: '10001',
          message: '用户不存在',
          data: null,
        },
        200,
      );
    }
    if (target?.password === md5(body.password)) {
      const token = await this.jwtService.signAsync({
        sub: target.id,
        user: target,
      });
      response.setHeader('token', token);
      return token;
    }
    throw new HttpException(
      {
        code: '10001',
        message: '密码错误',
        data: null,
      },
      HttpStatus.OK,
    );
  }

  async register(body: LoginDto, request) {
    const target = await this.usesRepository.findOneBy({
      username: body.username,
    });
    if (target) {
      throw new HttpException(
        {
          code: '10001',
          message: '用户已存在',
          data: null,
        },
        200,
      );
    }
    const user = new User();
    user.username = body.username;
    user.password = md5(body.password); //
    return await this.usesRepository.save(user);
  }
}
