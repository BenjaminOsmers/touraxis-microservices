import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jsmith',
    description: 'The username of the User',
    required: true,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: 'The first name of the User',
    required: true,
  })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Smith',
    description: 'The last name of the User',
    required: true,
  })
  last_name: string;
}
