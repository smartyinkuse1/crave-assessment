import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/task/models/task.entity';

@ObjectType()
@InputType('PhaseInput')
export class Phase {
  constructor(id: number, title: string, tasks: Task[] = []) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @Field()
  id: number;

  @Field()
  title: string;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
