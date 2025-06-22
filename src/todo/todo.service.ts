import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoEntity } from 'src/entity/create-todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
//mqbte
    constructor(
        @InjectRepository(CreateTodoEntity)
        private readonly todoRepository: Repository<CreateTodoEntity>
    ) {}

    /*<========================================>
         🏳️   Create todo  Start    🏳️
    ===========================================>*/

    async createTodo(
        createTodoDto: CreateTodoDto,
        userId: number,userName: string,
        imagePath?: string,
    ):Promise<{ message: string }> {
       

        const newTodo = {
            ...createTodoDto,
            userId,
            userName,
            imagePath
        };

        const todo = this.todoRepository.create(newTodo);
        await this.todoRepository.save(todo);

        return { message: 'Todo created successfully' };

    }

    /*<========================================>
       🚩       Create todo End        🚩
    ===========================================>*/

     /*<========================================>
         🏳️   get person all todo  Start    🏳️
    ===========================================>*/

    async getPersonTodo(userId: number): Promise<CreateTodoEntity[]> {

        console.log(userId, 'User ID in service');
        return this.todoRepository.find({ where: { userId } });
    }


    /*<========================================>
       🚩     get person all todo End        🚩
    ===========================================>*/

    /*<========================================>
         🏳️   get person todo by id  Start  🏳️
    ===========================================>*/
    async getTodoById(userId: number, id: number): Promise<CreateTodoEntity> {
        
        
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
        
        
    if (!todo) {
        throw new NotFoundException('Todo not found');
    }
        
        return todo;
    }
    /*<========================================>
       🚩   get person todo by id End      🚩
    ===========================================>*/
    /*<========================================>
         🏳️   delete person todo by id  Start   🏳️
    ===========================================>*/
    async deleteTodoById(userId: number, id: number): Promise<{ message: string }> {
        const todo = await this.todoRepository.findOne({ where: { id, userId } });

        if (!todo) {
            throw new NotFoundException('Todo not found');
        }

        await this.todoRepository.delete(id);

        return { message: 'Todo deleted successfully' };
    }
    /*<========================================>
       🚩   delete person todo by id End    🚩
    ===========================================>*/


}