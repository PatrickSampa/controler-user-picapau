import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from '../models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest){
        return this.authService.login(req.user)
    }

    
    @IsPublic()
    @Post('create/user')
    async create(@Body() createUserDto: CreateUserDto){
        return this.authService.create(createUserDto)
    }



    @Get('users')
    findAll() {
      return this.authService.findAll();
    }


    @Patch('update/user')
    update(@Request() req: AuthRequest, @Body() user: UpdateUserDto) { 
      return this.authService.update(req.headers.authorization, user);
    }





  @Delete('delete/user')
  remove(@Request() req: AuthRequest) {
    return this.authService.remove(req.headers.authorization)
  } 
  

}


