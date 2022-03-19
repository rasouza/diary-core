import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: LoggerService,
    }),
    ConfigModule,
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
