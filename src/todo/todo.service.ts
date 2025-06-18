import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoEntity } from 'src/entity/create-todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(CreateTodoEntity)
        private readonly todoRepository: Repository<CreateTodoEntity>
    ) {}

    async createTodo(createTodoDto: CreateTodoDto,userId: number,userName: string):  Promise<{ message: string }> {
       
        const newTodo = {
            ...createTodoDto, 
            userName,        
        };
        const todo = this.todoRepository.create(newTodo);
        await this.todoRepository.save(todo);

        return { message: 'Todo created successfully' };
        
    }

  


}
