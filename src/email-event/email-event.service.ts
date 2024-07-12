import { Injectable, Logger } from '@nestjs/common';
import { SesEventRecordRootDto } from './dto/ses-event.dto';
import { SesEventSummary } from './interfaces/ses-event-summary.interface';

@Injectable()
export class EmailEventService {
  private readonly logger = new Logger(EmailEventService.name);

  summarizeSesEvent(input: SesEventRecordRootDto): SesEventSummary[] | Error {
    try {
      const records = input.Records.map((record) => {
        const { ses } = record;

        // Transform spamVerdict.status to boolean
        const spam = ses.receipt.spamVerdict.status === 'PASS';

        // Transform virusVerdict.status to boolean
        const virus = ses.receipt.virusVerdict.status === 'PASS';

        // Transform dns veredicts to boolean
        const spfPass = ses.receipt.spfVerdict.status === 'PASS';
        const dkimPass = ses.receipt.dkimVerdict.status === 'PASS';
        const dmarcPass = ses.receipt.dmarcVerdict.status === 'PASS';
        const dns = spfPass && dkimPass && dmarcPass;

        // Extract month from mail.timestamp
        const mailTimestamp = new Date(ses.mail.timestamp);
        const mes = mailTimestamp.toLocaleString('default', { month: 'long' });

        // Check if processingTimeMillis > 1000
        const retrasado = ses.receipt.processingTimeMillis > 1000;

        // Extract username from mail.source
        const emisor = ses.mail.source.split('@')[0];

        // Extract usernames from mail.destination
        const receptor = ses.mail.destination.map(
          (email) => email.split('@')[0],
        );

        return {
          spam,
          virus,
          dns,
          mes,
          retrasado,
          emisor,
          receptor,
        };
      });

      return records;
    } catch (error) {
      this.logger.error(
        `Error in summarizeSesEvent: ${error.message}`,
        error.stack,
      );

      throw new Error('Error processing SES event');
    }
  }
}
