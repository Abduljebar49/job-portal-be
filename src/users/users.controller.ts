import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { LoginData } from './dto/login.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.service.findOne(id);
  }

//   @Post('login')
//   async login(@Body() logData: LoginData): Promise<any> {
//     if (logData.username) {
//       var user: User = await this.service.findUsingUsername(logData.username);
//       if (user) {
//         const isMatch = await bcrypt.compare(logData.password, user.password);
//         if (isMatch) {
//           return user;
//         } else {
//           return {
//             statusCode: 401,
//             message: 'incorrect username or password',
//           };
//         }
//       } else {
//         return {
//           statusCode: 401,
//           message: 'incorrect username or password',
//         };
//       }
//     }
//   }

  @Post()
  async createUser(@Body() createUserDto: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    return this.service.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.service.remove(id);
  }
}
