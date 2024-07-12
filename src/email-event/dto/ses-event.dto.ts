import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VerdictDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ActionDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  topicArn: string;
}

export class ReceiptDto {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @IsString()
  @IsNotEmpty()
  dmarcPolicy: string;

  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}

export class HeaderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CommonHeadersDto {
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

export class MailDto {
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
  @Type(() => HeaderDto)
  headers: HeaderDto[];

  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders: CommonHeadersDto;
}

export class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}

export class SesEventRecordDto {
  @IsString()
  @IsNotEmpty()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @IsString()
  @IsNotEmpty()
  eventSource: string;
}

export class SesEventRecordRootDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesEventRecordDto)
  Records: SesEventRecordDto[];
}
