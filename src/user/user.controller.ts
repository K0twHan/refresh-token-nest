import { Body, Controller, Get, Param, Post, UseGuards,Headers } from '@nestjs/common';
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
        @Body() body: DepositDTO,@Headers() headers
    ) {
        const token = headers['authorization']?.split(' ')[1];
        await this.userService.depositFunds(token, body.amount);
    }


    @Get('profile/:id')
    async getProfile(@Param('id') userId: number) {
        return await this.userService.getProfile(+userId);
    }
}
