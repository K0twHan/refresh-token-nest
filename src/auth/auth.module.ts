import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/guard';

@Module({
  providers: [AuthService,AuthGuard],
  controllers: [AuthController],
  imports: [DbModule,JwtModule.register({
    secret: process.env.JWT,
    signOptions: { expiresIn: '15m' },
  })],
})
export class AuthModule {}
