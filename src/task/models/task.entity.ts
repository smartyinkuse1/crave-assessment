import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TaskCompletion } from './task-completion.entity';

@InputType('TaskInput')
@ObjectType()
export class Task {
  constructor(
    id: number,
    title: string,
    taskCompletions: TaskCompletion[] = [],
  ) {
    this.id = id;
    this.title = title;
    this.taskCompletions = taskCompletions;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @Field()
  id: number;

  @Field()
  title: string;

  @Field(() => [TaskCompletion], { nullable: true })
  taskCompletions?: TaskCompletion[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export class TaskStatus extends Task {
  @Field()
  isCompleted: boolean;
}
