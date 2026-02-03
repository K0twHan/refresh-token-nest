import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/services/Iuser.service';
import { CreateUserDTO } from './dto/createUserDTO';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {}
    async createUser(data: CreateUserDTO): Promise<any> {
        console.log('Hashing password...');
        await this.hashPassword(data.password).then(hashedPassword => {
            data.password = hashedPassword;
        });
        console.log('Creating user with hashed password...');
        await this.userRepository.createUser(data);
    }
    async getProfile(userId: number): Promise<any> {
        return await this.userRepository.getProfile(userId);
    }
    async depositFunds(userId: number, amount: number): Promise<any> {
        return await this.userRepository.depositFunds(userId, amount);
    }
    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

}
