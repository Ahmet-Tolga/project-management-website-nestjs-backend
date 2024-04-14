import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './entity/userEntity.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUserDto.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(userEntity) private userRepository:Repository<userEntity>){};

    async getall(){
        return await this.userRepository.find({relations:{developingProjects:true,responsibleProjects:true}});
    }

    async findUserByEmail(email:string){
        return await this.userRepository.findOne({where:{email:email}});
    }

    async findUserById(id:string){
        return await this.userRepository.findOne({where:{id:id}});
    }

    async findusers(ids:string[]){
        return await this.userRepository.findByIds(ids);
    }

    async create(createUserDto: createUserDto) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.save({ ...createUserDto, password: hashedPassword });
    }

    async delete(id:string){
        const user=await this.userRepository.findOne({where:{id:id},relations:{developingProjects:true}});
        user.developingProjects=[];
        await this.userRepository.save(user);
        return await this.userRepository.delete(id);
    }

    async saveUser(user:userEntity){
        return await this.userRepository.save(user);
    }
    
}
