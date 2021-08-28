import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private config: ConfigService) {}

  @Public()
  @Get()
  getHello() {
    const name = this.config.get<string>('npm_package_name');
    const version = this.config.get<string>('npm_package_version');
    const description = this.config.get<string>('npm_package_description');
    return { name, version, description };
  }
}
