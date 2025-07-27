import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { CreateProductDto } from './dto/create-product.dto';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  /*🏳️<===============(Create product Start)===============>🏳️*/
  
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('imagePath', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const originalName = parse(file.originalname).name.replace(/\s+/g, '-');
          const ext = extname(file.originalname);
          const timestamp = Date.now();
          const finalFileName = `product-${originalName}-${timestamp}${ext}`;
          cb(null, finalFileName);
        },
      }),
    }),
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.productService.createProduct(
      createProductDto,
      userId,
      image?.filename,
    );
  }


  /*🚩<===============(Create product End)===============>🚩*/

//   /*🏳️<===============(Update product Start)===============>🏳️*/
//   @Put('update/:id')
//   @UseGuards(JwtAuthGuard)
//   @UseInterceptors(
//     FileInterceptor('imagePath', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           cb(null, `product-${uniqueSuffix}${ext}`);
//         },
//       }),
//     }),
//   )
//   async updateProduct(
//     @Param('id') id: number,
//     @Body() updateProductDto: UpdateProductDto,
//     @Req() req,
//     @UploadedFile() image?: Express.Multer.File,
//   ) {
//     const userId = req.user.id;
//     return this.productService.updateProduct(
//       id,
//       updateProductDto,
//       userId,
//       image?.filename,
//     );
//   }
  /*🚩<===============(Update product End)===============>🚩*/

  /*🏳️<===============(Get all products Start)===============>🏳️*/
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
  /*🚩<===============(Get all products End)===============>🚩*/

  /*🏳️<===============(Get product by id Start)===============>🏳️*/
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
  /*🚩<===============(Get product by id End)===============>🚩*/

  /*🏳️<===============(Delete product Start)===============>🏳️*/
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.productService.deleteProduct(id, userId);
  }
  /*🚩<===============(Delete product End)===============>🚩*/
}
