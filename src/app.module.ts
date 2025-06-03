import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.enity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:  5432,
      username: 'postgres',
      password: '1943',
      database: 'todonest',
      entities: [User],
      synchronize: true, 
    }),
    AuthModule,
    TodoModule],
})
export class AppModule {}
