import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { WinstonModuleOptions, utilities } from 'nest-winston';
import { transports, format } from 'winston';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const { combine, timestamp, ms } = format;
    const {
      format: { nestLike },
    } = utilities;

    const token = this.configService.get('LOGTAIL_TOKEN');
    const level = this.configService.get('LOG_LEVEL');
    const logtail = new Logtail(token);

    return {
      level,
      transports: [
        new LogtailTransport(logtail),
        new transports.Console({
          format: combine(
            timestamp(),
            ms(),
            nestLike('Diary', { prettyPrint: true }),
          ),
        }),
      ],
    };
  }
}
