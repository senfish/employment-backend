import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { EmploymentUser } from './entities/employment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentUser])],
  controllers: [EmploymentController],
  providers: [EmploymentService],
})
export class EmploymentModule {}
