import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto, CreateUserDto, UpdateUserDto } from '@app/common/dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  // @desc: Create a user
  // @route: POST /users
  // @access: Public
  @Post()
  @ApiResponse({
    status: 201,
    type: UserDto,
    description: 'The user has been successfully created.',
  })
  @ApiBody({ type: CreateUserDto, description: 'The user to be created.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }

  // @desc: List all users
  // @route: GET /users
  // @access: Public
  @Get()
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
    description: 'The users have been successfully retrieved.',
  })
  async getAllUsers() {
    return this.natsClient.send({ cmd: 'getAllUsers' }, {});
  }

  // @desc: Get user info
  // @route: GET /users/:id
  // @access: Public
  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'getUser' }, id);
  }

  // @desc: Update user info
  // @route: PATCH /users/:id
  // @access: Public
  @Put(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBody({ type: UpdateUserDto, description: 'The user to be updated.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.natsClient.send({ cmd: 'updateUser' }, { id, updateUserDto });
  }
}
