import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the task',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Task 1',
    description: 'The name of the task',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This is the first task',
    description: 'The description of the task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date and time the task was created',
  })
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date and time the task was last updated',
  })
  @IsDateString()
  @IsNotEmpty()
  updated_at: Date;
}
