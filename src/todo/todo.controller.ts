import { Body,
         Controller, 
         Post, 
         Req, 
         UseGuards,
         UseInterceptors,
         UploadedFile,
         Get,
         Param,
         Delete,
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

  /*🏳️<===============(get person all todo start)===============>🏳️*/

    @Get('get')
    @UseGuards(JwtAuthGuard)
    async getPersonTodo(@Req() req) {
      const userId = req.user.id;
      console.log('User ID:', userId);
      return this.todoService.getPersonTodo(userId);
    }

  /*🚩<===============(get person all todo end)===============>🚩*/

  /*🏳️<===============(get person todo by id start)===============>🏳️*/

    @Get('getById/:id')
    @UseGuards(JwtAuthGuard)
    async getTodoById(@Req() req, @ Param('id') id: number) {
      const userId = req.user.id;
      return this.todoService.getTodoById(userId, id);
    }
  /*🚩<===============(get person todo by id end)===============>🚩*/
  /*🏳️<===============(delete person todo by id start)===============>🏳️*/

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async deleteTodoById(@Req() req, @Param('id') id: number) {
      const userId = req.user.id;
      return this.todoService.deleteTodoById(userId, id);
    }
  /*🚩<===============(delete person todo by id end)===============>🚩*/





}

