import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskListDto } from './dto/task-list.dto';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private usesRepository: Repository<Task>;
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll(body) {
    const mergeOption = Object.assign(
      {
        pageSize: 10,
        page: 1,
      },
      body,
    ) as unknown as TaskListDto;
    const skip = (mergeOption.page - 1) * mergeOption.pageSize;
    const [data, total] = await this.usesRepository.findAndCount({
      skip,
      take: mergeOption.pageSize,
    });
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
