import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { AuthRequest } from '../models/AuthRequest';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @IsPublic()
  @Patch()
  update(@Request() req: AuthRequest) { 
    return this.userService.update(req.body);
  }

  @Delete()
  remove(@Request() req: AuthRequest) {
    return this.userService.remove(req.headers.authorization)
  }
}
