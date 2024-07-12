import { Module } from '@nestjs/common';
import { EmailEventModule } from './email-event/email-event.module';

@Module({
  imports: [EmailEventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
