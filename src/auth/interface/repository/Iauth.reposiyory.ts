export interface IAuthRepository {
    saveRefreshToken(email: string, refreshToken: string): Promise<void>;
    getRefreshToken(userId: number): Promise<string | null>;
    removeRefreshToken(userId: number): Promise<void>;
    findUserByEmail(email: string): Promise<any>;
}