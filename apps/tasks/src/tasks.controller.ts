import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTaskDto, UpdateTaskDto } from '@app/common/dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'createTask' })
  async createTask(data: { user_id: string; createTaskDto: CreateTaskDto }) {
    return await this.tasksService.createTask(
      +data.user_id,
      data.createTaskDto,
    );
  }

  @MessagePattern({ cmd: 'getUserTasks' })
  async getUserTasks(user_id: string) {
    return await this.tasksService.getUserTasks(+user_id);
  }

  @MessagePattern({ cmd: 'getTaskDetails' })
  async getTaskDetails(data: { user_id: string; task_id: string }) {
    return await this.tasksService.getTaskDetails(+data.user_id, +data.task_id);
  }

  @MessagePattern({ cmd: 'updateTask' })
  async updateTask(data: {
    user_id: string;
    task_id: string;
    updateTaskDto: UpdateTaskDto;
  }) {
    return await this.tasksService.updateTask(
      +data.user_id,
      +data.task_id,
      data.updateTaskDto,
    );
  }

  @MessagePattern({ cmd: 'deleteTask' })
  async deleteTask(data: { user_id: string; task_id: string }) {
    return await this.tasksService.deleteTask(+data.user_id, +data.task_id);
  }
}
