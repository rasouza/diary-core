import { Global, Module } from '@nestjs/common';
import { clientFactory } from './client';

@Global()
@Module({
  providers: [clientFactory],
  exports: [clientFactory],
})
export class SupabaseModule {}
