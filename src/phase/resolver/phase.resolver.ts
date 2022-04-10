import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Phase } from '../models/phase.entity';
import { PhaseCompletion } from '../outputs/phase-completion.output';
import { PhaseService } from '../phase.service';

@Resolver()
export class PhaseResolver {
  constructor(private readonly phaseService: PhaseService) {}

  @Mutation(() => Phase)
  async createPhase(@Args('phase') phase: Phase) {
    return await this.phaseService.createPhase(phase);
  }
  @Query(() => [Phase])
  async getPhases() {
    return await this.phaseService.getPhases();
  }
  @Query(() => Phase)
  async getPhase(@Args('id') phaseId: number) {
    return await this.phaseService.getPhase(phaseId);
  }
  @Query(() => [PhaseCompletion])
  async getPhaseStepsByStartUpId(@Args('id') startUpId: number) {
    return await this.phaseService.getPhaseStepsByStartUpId(startUpId);
  }
}
