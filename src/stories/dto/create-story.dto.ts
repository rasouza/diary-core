import { IsDateString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  repo: string;

  @IsDateString()
  date: Date;

  @IsNotEmpty()
  summary: string;

  @IsOptional()
  thoughts?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  created_at: Date;

  updated_at: Date;
}
