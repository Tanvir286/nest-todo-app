
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
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
  userId: number; // ➕ userId added

  @Column()
  userName: string; // ➕ userName added


  @CreateDateColumn()
  createdAt: Date;
  
}