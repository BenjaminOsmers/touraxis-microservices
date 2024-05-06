import { Task } from '@app/common/entities/task.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto, UpdateTaskDto } from '@app/common/dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @Inject('NATS_SERVICE')
    private natsClient: ClientProxy,
  ) {}

  async createTask(user_id: number, createTaskDto: CreateTaskDto) {
    const user = await this.natsClient
      .send({ cmd: 'getUser' }, user_id)
      .toPromise();

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });

    return await this.tasksRepository.save(task);
  }

  async getUserTasks(user_id: number) {
    return await this.tasksRepository.find({
      where: {
        user: { id: user_id },
      },
    });
  }

  async getTaskDetails(user_id: number, task_id: number) {
    return await this.tasksRepository.findOneOrFail({
      where: {
        id: task_id,
        user: { id: user_id },
      },
    });
  }

  async updateTask(
    user_id: number,
    task_id: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.getTaskDetails(user_id, task_id);

    await this.tasksRepository.update(task_id, updateTaskDto);

    return { ...task, ...updateTaskDto };
  }

  async deleteTask(user_id: number, task_id: number) {
    const task = await this.getTaskDetails(user_id, task_id);

    await this.tasksRepository.delete(task_id);

    return task;
  }
}
