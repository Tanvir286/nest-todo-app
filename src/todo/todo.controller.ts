import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';


@Controller('todo')
export class TodoController {
// dfdfdfdfd
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const userId = req.user.id;
    const userName = req.user.name;
    console.log('User ID:', userId);
    console.log('User Name:', userName);
    return this.todoService.createTodo(createTodoDto,userId,userName); 
  }



}
