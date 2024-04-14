import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entity/userEntity.entity';
import { ProjectService } from '../project/project.service';
import { ProjectEntity } from '../project/entities/project.entity';

@Module({
  controllers: [UserController],
  providers: [UserService,ProjectService],
  imports:[TypeOrmModule.forFeature([userEntity,ProjectEntity])]
})
export class UserModule {}
