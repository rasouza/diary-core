import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(@Inject('Supabase') private db: SupabaseClient) {}

  async create(createStoryDto: CreateStoryDto) {
    const { data, error } = await this.db
      .from<Story>('stories')
      .insert(createStoryDto);

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await this.db.from<Story>('stories').select('*');

    if (error) throw error;

    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.db
      .from<Story>('stories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    const { data, error } = await this.db
      .from<Story>('stories')
      .update(updateStoryDto)
      .eq('id', id);

    if (error) throw error;

    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.db
      .from<Story>('stories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return data;
  }
}
