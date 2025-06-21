import { IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @IsString()
  taskTitle: string;

  @IsOptional()
  @IsString()
  taskDetails: string;

  // @IsOptional()
  // @IsString()
  // taskImage?: string;
}