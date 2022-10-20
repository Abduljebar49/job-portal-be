import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from 'src/users/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(logData: LoginData): Promise<any> {
    const user = await this.authService.validateUser(logData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
