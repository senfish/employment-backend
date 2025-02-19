import { Injectable } from '@nestjs/common';
import { CreateRefreshDto } from './dto/create-refresh.dto';
import { UpdateRefreshDto } from './dto/update-refresh.dto';

@Injectable()
export class RefreshService {
  refreshToken() {}
}
