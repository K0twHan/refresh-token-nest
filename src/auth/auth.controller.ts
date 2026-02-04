import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/loginUserDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get('hi')
    hi() {
        return 'Hello from AuthController!';
    }
    @Post('signin')
    async signIn(@Body() dto : SignInDTO) {

    
  
        return await this.authService.signIn(dto.email, dto.password);
    }
}
