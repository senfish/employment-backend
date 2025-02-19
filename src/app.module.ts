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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'], // 前面的配置地址权重更高（前覆盖后）
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sens',
      database: 'employment',
      logging: true,
      poolSize: 10,
      entities: [Task, EmploymentUser],
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UploadModule,
    RefreshModule,
    EnterModule,
    TaskModule,
    EmploymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
