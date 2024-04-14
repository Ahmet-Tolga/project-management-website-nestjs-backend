import { Controller,Get,Param,Body,Post, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUserDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGurd } from '../auth/guards/jwt.guard';

@ApiTags("user")
@UseGuards(JwtAuthGurd)
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){};

    @Get("getall")
    getAllUsers(){
        return this.userService.getall();
    }

    @Get("get/:id")
    findAUser(@Param("id") id:string){
        return this.userService.findUserById(id);
    }

    @Delete("delete/:id")
    delete(@Param("id") id:string){
        return this.userService.delete(id);
    }
}
