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
    async signIn(@Body() dto : SignInDTO,@Res({ passthrough: true }) res) {

    
  
        let result = await this.authService.signIn(dto.email, dto.password);
        res.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return { access_token: result.access_token };
    }
}
