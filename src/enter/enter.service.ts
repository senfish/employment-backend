import { Injectable } from '@nestjs/common';
import { CreateEnterDto } from './dto/create-enter.dto';
import { UpdateEnterDto } from './dto/update-enter.dto';

@Injectable()
export class EnterService {
  create(createEnterDto: CreateEnterDto) {
    return 'This action adds a new enter';
  }
}
