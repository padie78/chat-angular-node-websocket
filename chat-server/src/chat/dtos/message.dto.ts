import { IsString, Length, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MessageDto {

  @IsString()
  @Length(1, 20)
  user: string;

  @IsString()
  @Length(1, 500)
  text: string;

  @IsDate()
  @Type(() => Date)
  timestamp: Date;
}