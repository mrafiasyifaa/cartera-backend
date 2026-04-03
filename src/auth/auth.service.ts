import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async login(email: string, password: string): Promise<string>{
        const user = await this.usersService.findByEmail(email)

        const isValid = user && (await bcrypt.compare(password, user.password))

        if(!isValid){
            throw new UnauthorizedException('Email atau password salah!');
        }

        return this.jwtService.sign({ sub: user.id, email: user.email})
    }
}
