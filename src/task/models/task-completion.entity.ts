import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Phase } from 'src/phase/models/phase.entity';
import { StartUp } from 'src/start-up/models/start-up.entity';
import { Task } from './task.entity';

@InputType('TaskCompletionInput')
@ObjectType()
export class TaskCompletion {
  constructor(id: number, startUp: StartUp, task: Task, phase: Phase) {
    this.id = id;
    this.startUp = startUp;
    this.task = task;
    this.phase = phase;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @Field()
  id: number;

  @Field(() => StartUp)
  startUp: StartUp;

  @Field(() => Task)
  task: Task;

  @Field(() => Phase)
  phase: Phase;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
