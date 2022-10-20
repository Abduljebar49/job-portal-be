import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { LoginData } from './dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ){
    }

    async findAll():Promise<User[]>{
        return this.userModel.findAll();
    }

    async findOne(id:number):Promise<User>{
        return this.userModel.findOne({
            where:{
                id
            }
        });
    }

    async findUsingUsername(username:string):Promise<User>{
        return this.userModel.findOne({
            where:{
                username
            }
        })
    }

    async remove(id:number):Promise<string>{
        const User = await this.userModel.findOne({
            where:{
                id
            }
        })
        if(User){
            await User.destroy();
            return "Successfully deleted";
        }
        else{
            return "Not found";
        }
    }

    async create(createUserDto:User):Promise<User>{
        return await this.userModel.create({
            username:createUserDto.username,
            firstName:createUserDto.firstName,
            lastName:createUserDto.lastName,
            password:createUserDto.password,
            email:createUserDto.email,
            role:createUserDto.role
        });
    }


    // login(logData:LoginData):Promise<any>{

    //     return of()
    // }
}
