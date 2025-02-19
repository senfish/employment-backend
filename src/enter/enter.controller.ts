import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnterService } from './enter.service';
import { CreateEnterDto } from './dto/create-enter.dto';
import { UpdateEnterDto } from './dto/update-enter.dto';

@Controller('enter')
export class EnterController {
  constructor(private readonly enterService: EnterService) {}

  @Post('/submit')
  create(@Body() createEnterDto: CreateEnterDto) {
    return this.enterService.create(createEnterDto);
  }
}
