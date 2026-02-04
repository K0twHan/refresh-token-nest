
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/db.service';
import * as bcrypt from 'bcrypt';
import { parse } from 'node:path';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private authRepository: AuthRepository,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.hashData(process.env.JWT_REFRESH_SECRET || '');
    await this.authRepository.saveRefreshToken(email, refreshToken);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {secret : process.env.JWT, expiresIn:'15m' }),
      refresh_token: refreshToken,
    };
  }



  private async hashData(data: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(data, saltRounds);
  }


}
