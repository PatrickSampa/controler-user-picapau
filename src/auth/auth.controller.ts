import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(){
        return "alguma coisa"
    }
}
