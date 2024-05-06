import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@app/common/dto';
import { User } from '@app/common/entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(id: string): Promise<User> {
    return await this.usersService.getUser(+id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(data: {
    id: string;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    return await this.usersService.updateUser(+data.id, data.updateUserDto);
  }
}
