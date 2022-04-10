import { Module } from '@nestjs/common';
import { PhaseResolver } from './resolver/phase.resolver';
import { PhaseService } from './phase.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [PhaseResolver, PhaseService],
})
export class PhaseModule {}
