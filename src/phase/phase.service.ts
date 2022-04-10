import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TaskStatus } from 'src/task/models/task.entity';
import { TaskService } from 'src/task/task.service';
import { Phase } from './models/phase.entity';
import { PhaseCompletion } from './outputs/phase-completion.output';

@Injectable()
export class PhaseService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly taskService: TaskService,
  ) {}
  async createPhase(phase: Phase) {
    const newPhase: Phase = new Phase(phase.id, phase.title);
    let phases: Phase[] = await this.getPhases();
    if (phases) {
      phases.push(newPhase);
    } else {
      phases = [];
      phases.push(newPhase);
    }
    await this.cacheManager.set('phase', phases);
    return newPhase;
  }

  async getPhases(): Promise<Phase[]> {
    return await this.cacheManager.get<Phase[]>('phase');
  }

  async getPhase(id: number) {
    const phases = await this.getPhases();
    const phase = phases.find((phase) => phase.id === id);
    return phase;
  }

  async getPhaseStepsByStartUpId(id: number) {
    const phases = await this.getPhases();
    const aggregratedPhase: PhaseCompletion[] = [];
    for await (const phase of phases) {
      const tasksStatus =
        await this.taskService.getTasksandTasksCompletedByPhaseIdAndStartUpId(
          phase.id,
          id,
        );
      aggregratedPhase.push({
        ...phase,
        tasks: tasksStatus,
      });
    }
    return aggregratedPhase;
  }
}
