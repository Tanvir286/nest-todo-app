import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity'; 
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CreateProductDto)
    private readonly productRepository: Repository<Crea>,
  ) {}

  /*🏳️<===============(Create Product Start)===============>🏳️*/
  async createProduct(
    createProductDto: CreateProductDto,
    userId: number,
    imagePath?: string,
  ): Promise<{ message: string }> {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      imageUrl: imagePath,
      // যদি user/store tracking দরকার হয় future এ
    });

    await this.productRepository.save(newProduct);

    return { message: 'Product created successfully' };
  }
  /*🚩<===============(Create Product End)===============>🚩*/

  /*🏳️<===============(Update Product Start)===============>🏳️*/
//   async updateProduct(
//     id: number,
//     updateProductDto: UpdateProductDto,
//     userId: number,
//     imagePath?: string,
//   ): Promise<{ message: string }> {
//     const product = await this.productRepository.findOne({ where: { id } });

//     if (!product) {
//       throw new NotFoundException('Product not found');
//     }

//     if (imagePath) {
//       product.imageUrl = imagePath;
//     }

//     Object.assign(product, updateProductDto);

//     await this.productRepository.save(product);

//     return { message: 'Product updated successfully' };
//   }
  /*🚩<===============(Update Product End)===============>🚩*/

  /*🏳️<===============(Get All Products Start)===============>🏳️*/
  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
  /*🚩<===============(Get All Products End)===============>🚩*/

  /*🏳️<===============(Get Product By ID Start)===============>🏳️*/
  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
  /*🚩<===============(Get Product By ID End)===============>🚩*/

  /*🏳️<===============(Delete Product Start)===============>🏳️*/
  async deleteProduct(id: number, userId: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(id);

    return { message: 'Product deleted successfully' };
  }
  /*🚩<===============(Delete Product End)===============>🚩*/
}
