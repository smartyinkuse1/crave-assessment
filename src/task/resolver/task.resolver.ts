import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskCompletion } from '../models/task-completion.entity';
import { Task } from '../models/task.entity';
import { TaskService } from '../task.service';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}
  @Mutation(() => Task)
  async createTask(@Args('task') taskInput: Task) {
    return await this.taskService.createTask(taskInput);
  }
  @Query(() => [Task])
  async getTasks() {
    return this.taskService.getTasks();
  }
  @Query(() => Task)
  async getTask(@Args('id') TaskId: number) {
    return await this.taskService.getTask(TaskId);
  }
  @Mutation(() => TaskCompletion)
  async updateTaskCompletion(
    @Args('taskCompletion') taskCompletion: TaskCompletion,
  ) {
    return await this.taskService.createTaskCompletion(taskCompletion);
  }
}
