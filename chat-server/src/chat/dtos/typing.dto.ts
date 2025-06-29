import { IsString, Length } from 'class-validator';

export class TypingDto {
  @IsString()
  @Length(1, 20)
  user: string;
}