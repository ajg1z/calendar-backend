import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
@Injectable()
export class TaskService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  create(name: string, ms: number, func: () => void) {
    const timeout = setTimeout(func, ms);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  delete(name: string) {
    const timeout = this.schedulerRegistry.getTimeout(name);
    clearTimeout(timeout);
    this.schedulerRegistry.deleteTimeout(name);
  }

  update(name: string, ms: number, func: () => void) {
    this.delete(name);
    this.create(name, ms, func);
  }
  deleteMany(names: string[]) {
    names.forEach((name) => {
      this.delete(name);
    });
  }
}
