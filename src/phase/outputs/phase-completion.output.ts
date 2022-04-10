import { Field, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from 'src/task/models/task.entity';

@ObjectType()
export class PhaseCompletion {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field(() => TaskStatus)
  tasks: TaskStatus[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
