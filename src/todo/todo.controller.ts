import { Body,
         Controller, 
         Post, 
         Req, 
         UseGuards,
         UseInterceptors,
         UploadedFile,
         Get,
        } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /*🏳️<===============(Create todo Start)===============>🏳️*/
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('imagePath', {
      storage: diskStorage({
        destination: './uploads', // Save images in uploads/ folder
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userId = req.user.id;
    const userName = req.user.name;
    console.log('Received DTO:', createTodoDto);
    console.log('User ID:', userId);
    console.log('User Name:', userName);
    console.log('Image Filename:', image?.filename);
    return this.todoService.createTodo(createTodoDto, userId, userName, image?.filename);
  }
  /*🚩<===============(Create todo End)===============>🚩*/

  /*🚩<===============(get todo start)===============>🚩*/

  @Get('get')
  @UseGuards(JwtAuthGuard)
  async getPersonTodo(@Req() req) {
    
    const userId = req.user.id;
    console.log('User ID:', userId);

    return this.todoService.getPersonTodo(userId);
  }






}

