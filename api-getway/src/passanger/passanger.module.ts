import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { PassangerController } from './passanger.controller';

@Module({
  imports: [ProxyModule],
  controllers: [PassangerController],
})
export class PassangerModule {}
