import { PartialType } from '@nestjs/mapped-types';
import { CreateEnterDto } from './create-enter.dto';

export class UpdateEnterDto extends PartialType(CreateEnterDto) {}
