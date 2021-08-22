import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    StoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
