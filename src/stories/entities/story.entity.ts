export class Story {
  id: number;
  user_id: string;
  repo: string;
  date: Date;
  summary: string;
  thoughts?: string;
  link?: string;
  created_at: Date;
  updated_at: Date;
}
