import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import {  JwtAuthGuard } from './guard/guard';
import { AuthRepository } from './repository/auth.repository';

@Module({
  providers: [AuthService,JwtAuthGuard,AuthRepository],
  controllers: [AuthController],
  imports: [DbModule,JwtModule.register({
    secret: process.env.JWT,
    signOptions: { expiresIn: '15m' },
  })],
  exports: [JwtAuthGuard,JwtModule],
})
export class AuthModule {}
