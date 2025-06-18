import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

}
