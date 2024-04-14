import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService:AuthService,private readonly configService:ConfigService) {
    super({
      clientID: configService.get("CLIENT_ID"),
      clientSecret: configService.get("CLIENT_SECRET"),
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, displayName, emails } = profile;
    const info = {
      googleId: id,
      username:displayName,
      email: emails[0].value,
      accessToken,
    };

    done(null, info);
  }
}
