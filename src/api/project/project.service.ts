import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>, private readonly userService: UserService) { };
    async getall() {
        return await this.projectRepository.find({ relations: { fieldManager: true, developingBy: true } });
    }

    async getOne(id: string) {
        return await this.projectRepository.find({ where: { id: id }, relations: { fieldManager: true, developingBy: true } })
    }

    async delete(id: string) {
        return await this.projectRepository.delete({ id: id });
    }

    async addNewDeveloper(project_id: string, user_id: string) {
        const project = await this.projectRepository.findOne({ where: { id: project_id }, relations: { developingBy: true } });
        const new_developer = await this.userService.findUserById(user_id);
        try {
            project.developingBy.push(new_developer);
            return await this.projectRepository.save(project);
        }
        catch (err) {
            throw new Error("cannot add a developer");
        }
    }

    async removeDeveloper(project_id: string, user_id: string) {
        const project = await this.projectRepository.findOne({ where: { id: project_id }, relations: { developingBy: true } });
        const new_developer = await this.userService.findUserById(user_id);
        try {
            project.developingBy = project.developingBy.filter(user => user.id != new_developer.id);
            return await this.projectRepository.save(project);
        }
        catch (err) {
            throw new Error("cannot remove a developer");
        }
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        return await this.projectRepository.update(id, updateProjectDto);
    }

    async create(createProjectDto: CreateProjectDto) {
        if (createProjectDto.developingByIds) {
            const users = await this.userService.findusers(createProjectDto.developingByIds);
            const project = await this.projectRepository.create(createProjectDto);
            project.developingBy = users;
            return await this.projectRepository.save(project);
        }
        return await this.projectRepository.save(createProjectDto);
    }

    async saveProject(project:ProjectEntity){
        return await this.projectRepository.save(project);
    }
}
