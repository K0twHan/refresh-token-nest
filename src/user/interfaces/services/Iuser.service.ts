
export interface IUserService {
    createUser(data: any): Promise<any>;
    getProfile(userId: number): Promise<any>;
    depositFunds(token: string, amount: number): Promise<any>;
}