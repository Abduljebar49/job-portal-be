import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Blog } from 'src/models/blog.model';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Logger } from '@nestjs/common';

@Controller('blog')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Blog> {
    return this.service.findOne(id);
  }

  @Get('/key/:key')
  findWithKey(@Param('key') key:string):Promise<Blog>{
    return this.service.findWithKey(key);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/',
        filename(req, file, callback) {
          const dateNum = Date.now();
          callback(null, `${dateNum}${extname(file.originalname)}`)
        },
      }),
    }),
  )

  async uploadFile(
    @Body() body: BlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body,file.filename)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.service.remove(id);
  }
}
