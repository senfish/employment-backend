import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { CreateRefreshDto } from './dto/create-refresh.dto';
import { UpdateRefreshDto } from './dto/update-refresh.dto';

@Controller('refresh')
export class RefreshController {
  constructor(private readonly refreshService: RefreshService) {}
  @Get('/token')
  async refreshToken() {
    const refreshToken = await this.refreshService.refreshToken();
    return refreshToken;
  }
}
