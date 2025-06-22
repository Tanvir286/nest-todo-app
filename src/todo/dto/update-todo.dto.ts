import { IsString, IsOptional } from 'class-validator';

export class UpdateTodoDto {

  @IsOptional()
  @IsString()
  taskTitle: string;

  @IsOptional()
  @IsString()
  taskDetails: string;

}