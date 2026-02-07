import { IUserRepository } from "../interfaces/repository/Iuser.repository";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/createUserDTO";
import { PrismaService } from "../../db/db.service";
import { userProfileDTO } from "../dto/userProfile.DTO";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prismaService: PrismaService) {}


    async createUser(data: CreateUserDTO): Promise<void> {
        try {
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

    catch (error) {
    if (error.code === 'P2002' && error.meta && error.meta.target.includes('email')) {
        throw new Error('Email already exists');
    }
    }
    }
   async  getProfile(userId: number): Promise<userProfileDTO | null> {
       const user = await this.prismaService.user.findUnique({
            where: { id: userId }
        });
        if(!user) {
            return null;
        }
        const profile: userProfileDTO = {
            email: user.email,
            name: String(user.name),
            lastName: String(user.lastName),
            balance: Number(user.money)
        }
        return profile;
    }
   async  depositFunds(userId: number, amount: number): Promise<void> {
        await this.prismaService.user.update({
            where: { id: userId },
            data: { money: { increment: amount } }
        });
    }
   
}