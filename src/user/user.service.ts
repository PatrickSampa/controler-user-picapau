import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,){}


  async create(createUserDto: CreateUserDto) {

    
    createUserDto.password = await bcypt.hash(createUserDto.password, 10)

    const createUser = await this.prisma.user.create({
      data: createUserDto
    })
    createUser.password = undefined;
    return createUser;
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map(({id, email, name}) => ({id, email, name}))
  }



  async update({email, name, password}, id:string) {
    if(!(await this.prisma.user.count({
      where: {id}
    }))){
      throw new Error("Usuario não encontrado")
    }
    const data: any = {};
    if(email){
      data.email = email
    }
    if(name){
      data.name = name
    }
    if(password){
      const newPassword =  await bcypt.hash(password, 10)
      data.password = newPassword
    }

    await this.prisma.user.update({
      where: { id}, 
      data
    })
     return this.findAll()
  }



  remove(id: string) {
    return  this.prisma.user.delete({
      where: {
        id
      }
    })
  }


  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    
    
  }


}
