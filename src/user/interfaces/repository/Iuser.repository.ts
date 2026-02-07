import { userProfileDTO } from "src/user/dto/userProfile.DTO";


export interface IUserRepository {
    createUser(data: any): Promise<void>;
    getProfile(userId: number): Promise<userProfileDTO | null>;
    depositFunds(userId: number, amount: number): Promise<void>;
}