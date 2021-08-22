import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const clientFactory = {
  provide: 'Supabase',
  useFactory: (configService: ConfigService) => {
    const url = configService.get<string>('SUPABASE_URL');
    const key = configService.get<string>('SUPABASE_KEY');
    return createClient(url, key);
  },
  inject: [ConfigService],
};
