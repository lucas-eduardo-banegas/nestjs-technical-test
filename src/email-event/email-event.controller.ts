import { Body, Controller, Post } from '@nestjs/common';
import { EmailEventService } from './email-event.service';
import { SesEventRecordRootDto } from './dto/ses-event.dto';
import { SesEventSummary } from './interfaces/ses-event-summary.interface';

@Controller('/email-event')
export class EmailEventController {
  constructor(private readonly emailEventService: EmailEventService) {}

  @Post('/summarize-ses')
  sesEvent(@Body() body: SesEventRecordRootDto): SesEventSummary[] | Error {
    return this.emailEventService.summarizeSesEvent(body);
  }
}
