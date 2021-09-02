import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { LogLevel } from '@sentry/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  Sentry.init({
    dsn: configService.get('SENTRY_DSN'),
    environment: configService.get('NODE_ENV'),
    release: configService.get('npm_package_version'),
    logLevel: LogLevel.Debug,
    debug: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Coding Diary API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
