import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(@Inject('Supabase') private db: SupabaseClient) {}

  async create(createStoryDto: CreateStoryDto) {
    return await this.db.from<Story>('stories').insert(createStoryDto);
  }

  async findAll() {
    return await this.db.from<Story>('stories').select('*');
  }

  async findOne(id: number) {
    return await this.db
      .from<Story>('stories')
      .select('*')
      .eq('id', id)
      .maybeSingle();
  }

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    return await this.db
      .from<Story>('stories')
      .update(updateStoryDto)
      .eq('id', id);
  }

  async remove(id: number) {
    return await this.db.from<Story>('stories').delete().eq('id', id);
  }
}
