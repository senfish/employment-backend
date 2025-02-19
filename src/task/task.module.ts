import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
// import { Employment } from 'src/employment/entities/employment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    // TypeOrmModule.forFeature([Employment]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
