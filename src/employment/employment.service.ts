import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { EmploymentUser } from './entities/employment.entity';
import { EmploymentListDto } from './dto/employment-list.dto';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(EmploymentUser)
    private employmentRepository: Repository<EmploymentUser>,
    // @InjectRepository(Task)
    // private taskRepository: Repository<Task>,
  ) {}
  async create(createEmploymentDto: CreateEmploymentDto) {
    // 先用idCard去查一遍，如果有重复的话，就走更新接口
    const res = await this.employmentRepository.findOne({
      where: {
        idCard: createEmploymentDto.idCard,
      },
    });
    if (res) {
      return this.employmentRepository.update(res.id, createEmploymentDto);
    } else {
      return this.employmentRepository.save(createEmploymentDto);
    }
  }

  async findAll() {
    return await this.employmentRepository.find();
  }

  async list(query: EmploymentListDto) {
    const mergeOption = Object.assign(
      {
        pageSize: 10,
        page: 1,
      },
      query,
    ) as unknown as EmploymentListDto;
    const skip = (mergeOption.page - 1) * mergeOption.pageSize;
    const [data, total] = await this.employmentRepository.findAndCount({
      skip,
      where: {
        name: mergeOption.name,
      },
      take: mergeOption.pageSize,
    });
    return {
      data,
      total,
    };
  }
  async remove(id: number) {
    const data = await this.employmentRepository.delete({
      id,
    });
    if (data.affected === 0) {
      throw new HttpException(
        {
          code: '10001',
          message: 'id不存在',
          data: null,
        },
        200,
      );
    } else {
      return '删除成功';
    }
  }
}
