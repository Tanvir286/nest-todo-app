
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CreateTodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskTitle: string;

  @Column()
  taskDetails: string;

  @Column({ nullable: true })
  taskImage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: string;
}
