import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Task 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'This is the first task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
