import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateStoryDto {
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  repo: string;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  summary: string;

  thoughts?: string;

  @IsUrl()
  link?: string;

  created_at: Date;

  updated_at: Date;
}
