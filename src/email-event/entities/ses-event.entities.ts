import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Verdict {
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class Action {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  topicArn: string;
}

export class Receipt {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => Verdict)
  spamVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  virusVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  spfVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  dkimVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  dmarcVerdict: Verdict;

  @IsString()
  @IsNotEmpty()
  dmarcPolicy: string;

  @ValidateNested()
  @Type(() => Action)
  action: Action;
}

export class Header {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CommonHeaders {
  @IsString()
  @IsNotEmpty()
  returnPath: string;

  @IsArray()
  @IsString({ each: true })
  from: string[];

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @IsString({ each: true })
  to: string[];

  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}

export class Mail {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @IsBoolean()
  headersTruncated: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Header)
  headers: Header[];

  @ValidateNested()
  @Type(() => CommonHeaders)
  commonHeaders: CommonHeaders;
}

export class Ses {
  @ValidateNested()
  @Type(() => Receipt)
  receipt: Receipt;

  @ValidateNested()
  @Type(() => Mail)
  mail: Mail;
}

export class SesEventRecord {
  @IsString()
  @IsNotEmpty()
  eventVersion: string;

  @ValidateNested()
  @Type(() => Ses)
  ses: Ses;

  @IsString()
  @IsNotEmpty()
  eventSource: string;
}

export class SesEventRecordRoot {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesEventRecord)
  records: SesEventRecord[];
}
