import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayLoadDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    // @Post('register')
    // register(@Body() authPayload: AuthPayLoadDto)

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Body() loginDto: LoginDto) {
        const user = this.authService.login(loginDto)
        //if (!user) throw new HttpException('invalid credentials', 401);
        return user
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {

    }
}
