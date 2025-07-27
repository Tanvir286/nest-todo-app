
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class CreateProduct {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // ওষুধের নাম

  @Column({ nullable: true })
  genericName: string; // জেনেরিক নাম (যদি থাকে)

  @Column({ nullable: true })
  brand: string; // কোম্পানির নাম (রেনেটা, স্কয়ার ইত্যাদি)

  @Column({ type: 'text', nullable: true })
  description: string; // ওষুধের বিস্তারিত

  @Column({ nullable: true })
  dosageForm: string; // Tablet, Capsule, Syrup ইত্যাদি

  @Column({ nullable: true })
  strength: string; // 500mg, 5ml ইত্যাদি

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // বিক্রয় মূল্য

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  purchasePrice: number; // ক্রয় মূল্য (আন্তরিক ব্যবস্থাপনার জন্য)

  @Column()
  stock: number; // ইনভেন্টরিতে কত পিস আছে

  @Column({ nullable: true })
  manufacturer: string; // উৎপাদনকারী প্রতিষ্ঠান

  @Column({ nullable: true })
  expiryDate: Date; // মেয়াদ শেষের তারিখ

  @Column({ nullable: true })
  imageUrl: string; // ওষুধের ছবি

  @CreateDateColumn()
  createdAt: Date;

 
}
