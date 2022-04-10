import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { StartUp } from './models/start-up.entity';

@Injectable()
export class StartUpService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async createStartUp(startUp: StartUp) {
    const newStartUp: StartUp = new StartUp(startUp.id, startUp.name);
    let startUps: StartUp[] = await this.getStartUps();
    if (startUps) {
      startUps.push(newStartUp);
    } else {
      startUps = [];
      startUps.push(newStartUp);
    }
    await this.cacheManager.set('startUp', startUps);
    return newStartUp;
  }

  async getStartUps(): Promise<StartUp[]> {
    return await this.cacheManager.get<StartUp[]>('startUp');
  }

  async getStartUp(id: number) {
    const startUps = await this.getStartUps();
    const startUp = startUps.find((startUp) => startUp.id === id);
    return startUp;
  }
}
