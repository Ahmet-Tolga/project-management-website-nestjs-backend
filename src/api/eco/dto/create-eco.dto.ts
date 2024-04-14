import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEcoDto {
  
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  user: string
  
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  @MinLength(5)
  message: string
}
