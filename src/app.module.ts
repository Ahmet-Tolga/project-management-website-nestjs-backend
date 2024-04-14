import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { EcoModule } from './api/eco/eco.module';
import { ProjectModule } from './api/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './api/project/entities/project.entity';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  EcoModule,
  DatabaseModule,
  ProjectModule,
  TypeOrmModule.forFeature([ProjectEntity]),
  UserModule,
  AuthModule,
  PassportModule.register({session:true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
