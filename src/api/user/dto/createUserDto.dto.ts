import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto{
    @ApiProperty({description:"it defines what is the email of user"})
    @IsEmail()
    @IsString()
    email:string;

    @ApiProperty({description:"it defines what is the username of user"})
    @IsString()
    username:string;

    @ApiProperty({description:"it defines what will be password of user"})
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    password:string;
}