import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TaskCompletion } from './models/task-completion.entity';
import { Task, TaskStatus } from './models/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async createTask(task: Task) {
    const newTask: Task = new Task(task.id, task.title);
    let tasks: Task[] = await this.getTasks();
    if (tasks) {
      tasks.push(newTask);
    } else {
      tasks = [];
      tasks.push(newTask);
    }
    await this.cacheManager.set('task', tasks);
    return newTask;
  }

  async getTasks(): Promise<Task[]> {
    return await this.cacheManager.get<Task[]>('task');
  }

  async getTasksandTasksCompletedByPhaseIdAndStartUpId(
    phaseId: number,
    startUpId: number,
  ) {
    // SQL INNERJOIN(s) Query to return this relationship
    const taskCompletions = await this.getTaskCompletions();

    const tasks = await this.getTasks();

    const newTasks: TaskStatus[] = tasks.map((task) => {
      if (
        taskCompletions.find(
          (completedTask) =>
            completedTask.phase.id === phaseId &&
            completedTask.startUp.id === startUpId &&
            completedTask.task.id === task.id,
        )
      ) {
        const { ...newTask } = {
          ...task,
          isCompleted: true,
        };
        return newTask;
      } else {
        const { ...newTask } = {
          ...task,
          isCompleted: false,
        };
        return newTask;
      }
    });
    return newTasks;
  }

  async getTaskCompletions(): Promise<TaskCompletion[]> {
    return await this.cacheManager.get<TaskCompletion[]>('taskCompletion');
  }

  async getTask(id: number) {
    const tasks = await this.getTasks();
    const task = tasks.find((Task) => Task.id === id);
    return task;
  }
  async createTaskCompletion(taskCompletion: TaskCompletion) {
    const newTaskCompletion: TaskCompletion = new TaskCompletion(
      taskCompletion.id,
      taskCompletion.startUp,
      taskCompletion.task,
      taskCompletion.phase,
    );

    let taskCompletions: TaskCompletion[] = await this.getTaskCompletions();
    if (taskCompletions) {
      taskCompletions.push(newTaskCompletion);
    } else {
      taskCompletions = [];
      taskCompletions.push(newTaskCompletion);
    }
    await this.cacheManager.set('taskCompletion', taskCompletions);
    return newTaskCompletion;
  }
}
