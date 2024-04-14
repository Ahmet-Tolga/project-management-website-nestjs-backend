import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from '../user/entity/userEntity.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule,} from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy,GoogleStrategy],
  imports: [
    TypeOrmModule.forFeature([userEntity]),
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("SECRET_KEY"),
        signOptions: {
          expiresIn: '1h'
        }
      })
    })
  ]
})
export class AuthModule {}
