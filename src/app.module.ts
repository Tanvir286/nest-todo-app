import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.enity';
import { TodoModule } from './todo/todo.module';
import { CreateTodoEntity } from './entity/create-todo.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:aYTPmaBTsdMVKgRcJQzuUFPhXjcoPiUa@shuttle.proxy.rlwy.net:17110/railway',
      ssl: { rejectUnauthorized: false },
      entities: [User,CreateTodoEntity],
      synchronize: true, 
    }),
    AuthModule,
    TodoModule],
})
export class AppModule {}