import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.enity';
import { TodoModule } from './todo/todo.module';
import { CreateTodoEntity } from './entity/create-todo.entity';
import { ProductModule } from './product/product.module';
import { Product } from './entity/create-product.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:aYTPmaBTsdMVKgRcJQzuUFPhXjcoPiUa@shuttle.proxy.rlwy.net:17110/railway',
      ssl: { rejectUnauthorized: false },
      entities: [User,CreateTodoEntity,Product],
      synchronize: true, 
    }),
    AuthModule,
    TodoModule,
    ProductModule],
})
export class AppModule {}




/*
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

*/