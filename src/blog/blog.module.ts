import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {Blog} from '../models/blog.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[
    SequelizeModule.forFeature([Blog])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
