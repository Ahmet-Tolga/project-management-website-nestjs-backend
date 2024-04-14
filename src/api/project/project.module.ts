import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UserService } from '../user/user.service';
import { userEntity } from '../user/entity/userEntity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity,userEntity])],
  controllers: [ProjectController],
  providers: [ProjectService,UserService]
})
export class ProjectModule {}
