import { IUserRepository } from "../interfaces/repository/Iuser.repository";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/createUserDTO";
import { PrismaService } from "../../db/db.service";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prismaService: PrismaService) {}


    async createUser(data: CreateUserDTO): Promise<any> {
        console.log(data)
        await this.prismaService.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                lastName: data.lastName,
                currency: data.currency,
                birthDay: data.birthDay,
                money: 0
            }
        });
    }
   async  getProfile(userId: number): Promise<any> {
       const user = await this.prismaService.user.findUnique({
            where: { id: userId }
        });
        if(!user) {
            return null;
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            currency: user.currency,
            birthDay: user.birthDay,
            money: user.money
        };
    }
   async  depositFunds(userId: number, amount: number): Promise<any> {
        await this.prismaService.user.update({
            where: { id: userId },
            data: { money: { increment: amount } }
        });
    }
   
}