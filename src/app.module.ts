import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StoriesModule } from './stories/stories.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}
