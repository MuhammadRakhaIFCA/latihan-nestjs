import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable({})
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private readonly jwtService: JwtService) { }

    async register(dto: RegisterDto) {
        const { username, email, password } = dto

        const existingUser = await this.databaseService.user.findUnique({ where: { email } })

        if (existingUser) {
            throw new BadRequestException('Email alredy used')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.databaseService.user.create({
            data: { username, email, password: hashedPassword }
        })


    }

    async login(dto: LoginDto) {
        const { username, password } = dto
        const findUser = await this.databaseService.user.findUnique({ where: { username } })
        if (!findUser) return null;
        if (password === findUser.password) {
            const { password, ...user } = findUser
            return this.generateToken(user);
        }
    }

    private generateToken(user: any) {
        const payload = { sub: user.id, username: user.username, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
