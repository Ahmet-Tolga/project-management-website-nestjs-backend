import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto{
    @ApiProperty({description:"it is about what the project name"})
    @MaxLength(30)
    @IsString()
    projectName:string;

    @ApiProperty({description:"it describes that what is project description and optional"})
    @MaxLength(30)
    @MinLength(5)
    @IsString()
    @IsOptional()
    description?:string;

    @ApiProperty({description:"it describes project image"})
    @IsString()
    @IsOptional()
    projectImage?:Buffer;

    @ApiProperty({description:"it describes how much of the project is finised"})
    @IsOptional()
    @IsNumber() 
    progres?:number;

    @ApiProperty({description:"it describes who is responsible for the project"})
    @IsString()
    @IsOptional()
    fieldManagerId?:string;

    @ApiProperty({description:"it describes who are developing the project"})
    @IsArray()
    @IsOptional()
    developingByIds?:string[];

    @ApiProperty({description:"it describes when the project starts"})
    @IsDateString()
    @IsOptional()
    startTime?:Date;

    @ApiProperty({description:"it describes the time when the project finishes"})
    @IsDateString()
    @IsOptional()
    endTime?:Date;
}