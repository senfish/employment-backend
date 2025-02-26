import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { RefreshModule } from './refresh/refresh.module';
import { EnterModule } from './enter/enter.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { EmploymentModule } from './employment/employment.module';
import { EmploymentUser } from './employment/entities/employment.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'], // 前面的配置地址权重更高（前覆盖后）
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('MYSQL_HOST'),
          port: config.get('MYSQL_PORT'),
          username: config.get('MYSQL_USERNAME'),
          password: config.get('MYSQL_PASSWORD'),
          database: 'employment',
          logging: true,
          poolSize: 10,
          entities: [Task, EmploymentUser, User],
          // autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'sens',
      signOptions: { expiresIn: '7d' },
    }),
    UploadModule,
    RefreshModule,
    EnterModule,
    TaskModule,
    EmploymentModule,
    UserModule,
  ],
  controllers: [AppController],
  exports: [JwtModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
