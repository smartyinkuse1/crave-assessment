import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TaskCompletion } from 'src/task/models/task-completion.entity';

@InputType('StartUpInput')
@ObjectType()
export class StartUp {
  constructor(
    id: number,
    name: string,
    taskCompletions: TaskCompletion[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.taskCompletions = taskCompletions;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => [TaskCompletion], { nullable: true })
  taskCompletions: TaskCompletion[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
