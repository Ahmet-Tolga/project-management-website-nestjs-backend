import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { createUserDto } from '../user/dto/createUserDto.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { Response } from 'express';

@ApiTags("authentication")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post("signup")
    signup(@Body() createUserDto: createUserDto) {
        return this.authService.signup(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Body("email") email: string, @Body("password") password: string) {
        return this.authService.login(email, password);
    }
    
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() { 
        return {message:"google authntication"};
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Res() res: Response) {
        console.log(req.user);
        if (!req.user) {
            return res.redirect('/auth/login');
        } else {
            const token=await this.authService.findOrCreate(req.user);
            res.json(token);
        }
    }
}
