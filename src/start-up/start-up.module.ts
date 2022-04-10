import { Module } from '@nestjs/common';
import { StartUpResolver } from './resolver/start-up.resolver';
import { StartUpService } from './start-up.service';

@Module({
  providers: [StartUpResolver, StartUpService]
})
export class StartUpModule {}
