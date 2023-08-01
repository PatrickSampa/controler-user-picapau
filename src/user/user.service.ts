import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcypt.hash(createUserDto.password, 10)

    const createUser = await this.prisma.user.create({
      data: createUserDto
    })
    createUser.password = undefined;
    return createUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    
    
  }


}
