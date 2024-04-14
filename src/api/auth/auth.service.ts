import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userEntity } from '../user/entity/userEntity.entity';
import { createUserDto } from '../user/dto/createUserDto.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private readonly jwtService:JwtService,private readonly configService:ConfigService){};


    async validateUser(email:string,password:string){
        const user=await this.userService.findUserByEmail(email);

        if(user && await bcrypt.compare(password,user.password)){
            return user;
        }
        return null;
    }
    async genereteToken(user:any){
        console.log(user);
        const payload={
            username:user.username,
            email:user.email
        }

        return {
            token:await this.jwtService.sign(payload)
        }
    }
    async login(email:string,password:string){
        const user=await this.validateUser(email,password);
        return await this.genereteToken(user);
    }

    async signup(createUserDto:createUserDto){
        const user=await this.userService.create(createUserDto);
        return await this.genereteToken(user);
    }

    async findOrCreate(payload:any){
        const user=await this.userService.findUserByEmail(payload.email);
        if(user){
            const token=await this.genereteToken(payload);
            return await token;
        }
        else{
            const password=this.configService.get("DEFAULT_PASSWORD")
            const hashedPassword=await bcrypt.hash(password,10);
            const new_user=await this.userService.create({username:payload.username,password:hashedPassword,email:payload.email});
            await this.userService.saveUser(new_user);
            const token=await this.genereteToken(payload);
            return await token;
        }
    }
}
