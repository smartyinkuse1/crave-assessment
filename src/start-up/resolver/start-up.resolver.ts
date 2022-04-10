import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StartUp } from '../models/start-up.entity';
import { StartUpService } from '../start-up.service';

@Resolver()
export class StartUpResolver {
  constructor(private readonly startUpService: StartUpService) {}

  @Mutation(() => StartUp)
  async createStartUp(@Args('startUp') startUp: StartUp) {
    return await this.startUpService.createStartUp(startUp);
  }
  @Query(() => [StartUp])
  async getstartUps() {
    return this.startUpService.getStartUps();
  }
  @Query(() => StartUp)
  async getstartUp(@Args('id') startUpId: number) {
    return await this.startUpService.getStartUp(startUpId);
  }
}
