import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Logger,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginData } from './users/dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req:LoginData) {
// Logger.log(req);
    return this.authService.validateUser(req);
  }
}
