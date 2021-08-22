export class CreateStoryDto {
  user_id: number;
  repo: string;
  date: Date;
  summary: string;
  thoughts?: string;
  link?: string;
  created_at: Date;
  updated_at: Date;
}
