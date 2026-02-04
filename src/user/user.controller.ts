import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUserDTO';
import { DepositDTO } from './dto/depositDTO';
import { JwtAuthGuard } from 'src/auth/guard/guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async createUser(@Body() dto: CreateUserDTO) {
        await this.userService.createUser(dto);
    }
    @UseGuards(JwtAuthGuard)
    @Post('deposit')
    async depositFunds(
        @Body() body: DepositDTO,
    ) {
        await this.userService.depositFunds(body.userId, body.amount);
    }


    @Get('profile/:id')
    async getProfile(@Param('id') userId: number) {
        return await this.userService.getProfile(+userId);
    }
}
