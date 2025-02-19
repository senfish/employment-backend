import { PartialType } from '@nestjs/mapped-types';
import { CreateRefreshDto } from './create-refresh.dto';

export class UpdateRefreshDto extends PartialType(CreateRefreshDto) {}
