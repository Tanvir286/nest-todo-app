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
         Put,
        } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /*🏳️<===============(Create todo Start)===============>🏳️*/
    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FileInterceptor('imagePath', {
        storage: diskStorage({
          destination: './uploads', 
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
      return this.todoService.createTodo(createTodoDto, userId, userName, image?.filename);
    }
  /*🚩<===============(Create todo End)===============>🚩*/
  /*🏳️<===============(update person todo by id start)===============>🏳️*/
    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FileInterceptor('imagePath', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `image-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async updateTodoById(
      @Req() req,
      @Param('id') id: number,
      @Body() updateTodoDto: UpdateTodoDto,
      @UploadedFile() image?: Express.Multer.File,
    ) {
      const userId = req.user.id;
      return this.todoService.updateTodoById(
        userId,
        id,
        updateTodoDto,
        image?.filename,
      );
    }
  /*🚩<===============(update person todo by id end)===============>🚩*/
  /*🏳️<===============(get person all todo start)===============>🏳️*/
    @Get('get')
    @UseGuards(JwtAuthGuard)
    async getPersonTodo(@Req() req) {
      const userId = req.user.id;
      return this.todoService.getPersonTodo(userId);
    }
  /*🚩<===============(get person all todo end)===============>🚩*/
  /*🏳️<===============(get person todo by id start)===============>🏳️*/

    @Get('getById/:id')
    @UseGuards(JwtAuthGuard)
    async getTodoById(
    @Req() req, 
    @Param('id') id: number) {
      const userId = req.user.id;
      return this.todoService.getTodoById(userId, id);
    }
  /*🚩<===============(get person todo by id end)===============>🚩*/
  /*🏳️<===============(delete person todo by id start)===============>🏳️*/

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async deleteTodoById(
    @Req() req, 
    @Param('id') id: number) {
      const userId = req.user.id;
      return this.todoService.deleteTodoById(userId, id);
    }
  /*🚩<===============(delete person todo by id end)===============>🚩*/





}

