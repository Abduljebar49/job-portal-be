import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from 'src/models/blog.model';
import { Logger } from '@nestjs/common';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog) private blogModel: typeof Blog
    ){
    }

    async findAll():Promise<Blog[]>{
        return this.blogModel.findAll();
    }

    async findOne(id:number):Promise<Blog>{
        return this.blogModel.findOne({
            where:{
                id
            }
        });
    }

    async findWithKey(key:string):Promise<Blog>{
        return this.blogModel.findOne({
            where:{
                key
            }
        })
    }

    async remove(id:number):Promise<string>{
        const blog = await this.blogModel.findOne({
            where:{
                id
            }
        })
        if(blog){
            await blog.destroy();
            return "Successfully deleted";
        }
        else{
            return "Not found";
        }
    }

    async create(createBlogDto:any,image:string):Promise<Blog>{
        return await this.blogModel.create({
            image:image,
            title: createBlogDto.title,
            description: createBlogDto.description,
            tags: createBlogDto.tags,
            author: createBlogDto.author,
            category:createBlogDto.category,
            key:createBlogDto.key,
        });
    }
}
