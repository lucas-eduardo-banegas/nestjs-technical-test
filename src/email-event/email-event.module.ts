import { Module } from '@nestjs/common';
import { EmailEventController } from './email-event.controller';
import { EmailEventService } from './email-event.service';

@Module({
  controllers: [EmailEventController],
  providers: [EmailEventService],
})
export class EmailEventModule {}
