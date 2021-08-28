import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    StoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TerminusModule,
    HttpModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
