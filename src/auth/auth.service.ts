import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { LoginData } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService:JwtService
    ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(logData: LoginData): Promise<any> {
    var user: User = await this.usersService.findUsingUsername(
      logData.username,
    );
    if (user) {
      const isMatch = await bcrypt.compare(logData.password, user.password);
      if (isMatch) {
        return user;
      } else {
        return new UnauthorizedException()
      }
    } else {
      return new UnauthorizedException()
    }
  }
}
