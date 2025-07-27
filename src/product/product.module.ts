import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/create-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Assuming no entities are used in ProductModule
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

