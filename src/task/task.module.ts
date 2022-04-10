import { Module } from '@nestjs/common';
import { TaskResolver } from './resolver/task.resolver';
import { TaskService } from './task.service';

@Module({
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
