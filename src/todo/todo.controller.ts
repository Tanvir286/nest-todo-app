import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([])) // Use empty array since no files are expected
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const userId = req.user.id;
    const userName = req.user.name;
    console.log('User ID:', userId);
    console.log('User Name:', userName);
    console.log('DTO:', createTodoDto); // Log DTO to debug
    return this.todoService.createTodo(createTodoDto, userId, userName);
  }
}