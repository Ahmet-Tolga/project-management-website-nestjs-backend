import { Body, Controller,Delete,Get,Param,Post, Put, UseGuards } from '@nestjs/common';
import { CreateProjectDto} from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGurd } from '../auth/guards/jwt.guard';

@ApiTags("Project")
@UseGuards(JwtAuthGurd)
@Controller('project')
export class ProjectController {
    constructor(private readonly projectSevice:ProjectService){}
    @Get("/getall")
    GetAllProjects(){
        return this.projectSevice.getall();
    }

    @Get("/get/:id")
    getOne(@Param("id") id:string){
        return this.projectSevice.getOne(id);
    }

    @Post("/create")
    create(@Body() createProjectDto:CreateProjectDto){
        return this.projectSevice.create(createProjectDto);
    }

    @Post("/addDeveloper/:project_id")
    addDeveloper(@Param("project_id") project_id:string,@Body("user_id") user_id:string){
        return this.projectSevice.addNewDeveloper(project_id,user_id);
    }

    @Post("/removeDeveloper/:project_id")
    removeDeveloper(@Param("project_id") project_id:string,@Body("user_id") user_id:string){
        return this.projectSevice.removeDeveloper(project_id,user_id);
    }

    @Put("/update/:id")
    update(@Body() updateProjectDto:UpdateProjectDto,@Param("id") id:string){
        return this.projectSevice.update(id,updateProjectDto);
    }

    @Delete("/delete/:id")
    delete(@Param("id") id:string){
        return this.projectSevice.delete(id);
    }
}
