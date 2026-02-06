import { IAuthRepository } from "../interface/repository/Iauth.reposiyory";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/db.service";
import { UserDTO } from "../dto/userDTO";

@Injectable()
export class AuthRepository  implements IAuthRepository {
    constructor(private readonly prismaService: PrismaService) {}

     async saveRefreshToken(email: string, refreshToken: string): Promise<void> {
        await this.prismaService.user.findUnique({ where: { email: email } }).then(async (user) => {
            if (user) {
                await this.prismaService.user.update({
                    where: { email: email },
                    data: { refreshToken: refreshToken }
                });
            }
        });
        
    }
    async getRefreshToken(userId: number): Promise<string> {
        return await this.prismaService.user.findUnique({ where: { id: userId } }).then((user) => {
            if (user && user.refreshToken) {
                return user.refreshToken;
            }
            throw new Error('User not found');
        });
    }
    async removeRefreshToken(userId: number): Promise<void> {
        await this.prismaService.user.update({
            where: { id: userId },
            data: { refreshToken: null }
        });;
    }


    async findUserByEmail(email: string): Promise<UserDTO | null> {
        return await this.prismaService.user.findUnique({ where: { email: email } });
    }
}