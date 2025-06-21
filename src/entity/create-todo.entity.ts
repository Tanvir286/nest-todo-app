
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('todo_list') 
export class CreateTodoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskTitle: string;

  @Column()
  taskDetails: string;

  @Column({ nullable: true })
  taskImage?: string;

  @Column()
  userId: number; 

  @Column()
  userName: string; 

  @CreateDateColumn()
  createdAt: Date;
  
}

