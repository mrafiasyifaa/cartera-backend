import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null>{
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(email: string, password: string): Promise<User>{
        const existing = await this.findByEmail(email);
        if(existing){
            throw new ConflictException('Email sudah terdaftar')
        }

        const hash = await bcrypt.hash(password, 12);
        const user = this.usersRepository.create({ email, password: hash });
        return this.usersRepository.save(user);
    }
}
