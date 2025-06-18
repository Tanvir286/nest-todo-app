import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { CreateTodoEntity } from 'src/entity/create-todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CreateTodoEntity])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
// ddjfkdjfkjdkjf