import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUserDTO';
import { DepositDTO } from './dto/depositDTO';
import { JwtAuthGuard } from 'src/auth/guard/guard';
import { globalReturn } from 'src/global/return-type/global.return';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async createUser(@Body() dto: CreateUserDTO) {
        await this.userService.createUser(dto);
        return globalReturn.success('User created successfully');
    }
    @UseGuards(JwtAuthGuard)
    @Post('deposit')
    async depositFunds(
        @Body() body: DepositDTO,@Request() req 
    ) {
        const id : number = req.user.sub
        await this.userService.depositFunds(id, body.amount);
        return globalReturn.success('Funds deposited successfully');
    }


    @Get('profile/:id')
    async getProfile(@Param('id') userId: number) {
        let profile = await this.userService.getProfile(+userId);
        return globalReturn.success('User profile retrieved successfully', profile);
    }
}
