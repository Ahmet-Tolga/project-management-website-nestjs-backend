import { CreateProjectDto } from "./CreateProject.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateProjectDto extends PartialType(CreateProjectDto){};