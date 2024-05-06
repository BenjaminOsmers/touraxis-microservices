import {
  Controller,
  Inject,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from '@app/common/dto';

@Controller('users')
export class TasksController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  // @desc: Create a task for a user
  // @route: POST /users/:id/tasks
  // @access: Public
  @Post(':user_id/tasks')
  @ApiResponse({
    status: 201,
    type: TaskDto,
    description: 'The task has been successfully created.',
  })
  @ApiBody({ type: CreateTaskDto, description: 'The task to be created.' })
  async createTask(
    @Param('user_id') user_id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.natsClient.send(
      { cmd: 'createTask' },
      { user_id, createTaskDto },
    );
  }

  // @desc: Get all tasks for a user
  // @route: GET /users/:id/tasks
  // @access: Public
  @Get(':user_id/tasks')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    isArray: true,
    description: 'The tasks have been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserTasks(@Param('user_id') user_id: string) {
    return this.natsClient.send({ cmd: 'getUserTasks' }, user_id);
  }

  // @desc: Get task info
  // @route: GET /users/:id/tasks/:task_id
  // @access: Public
  @Get(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    description: 'The task has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskDetails(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
  ) {
    return this.natsClient.send(
      { cmd: 'getTaskDetails' },
      { user_id, task_id },
    );
  }

  // @desc: Update a task
  // @route: Put /users/:id/tasks/:task_id
  // @access: Public
  @Put(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    description: 'The task has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiBody({ type: UpdateTaskDto, description: 'The task to be updated.' })
  async updateTask(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.natsClient.send(
      { cmd: 'updateTask' },
      { user_id, task_id, updateTaskDto },
    );
  }

  // @desc: Delete a task
  // @route: DELETE /users/:id/tasks/:task_id
  // @access: Public
  @Delete(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
  ) {
    return this.natsClient.send({ cmd: 'deleteTask' }, { user_id, task_id });
  }
}
