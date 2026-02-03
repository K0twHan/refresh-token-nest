

export interface IUserRepository {
    createUser(data: any): Promise<any>;
    getProfile(userId: number): Promise<any>;
    depositFunds(userId: number, amount: number): Promise<any>;
}