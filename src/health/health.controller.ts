import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const url = this.config.get<string>('APP_URL');
    return this.health.check([() => this.http.pingCheck('server', url)]);
  }
}
