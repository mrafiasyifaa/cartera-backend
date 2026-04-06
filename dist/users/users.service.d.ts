import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    create(email: string, password: string): Promise<User>;
}
