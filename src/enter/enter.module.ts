import { Module } from '@nestjs/common';
import { EnterService } from './enter.service';
import { EnterController } from './enter.controller';

@Module({
  controllers: [EnterController],
  providers: [EnterService],
})
export class EnterModule {}
