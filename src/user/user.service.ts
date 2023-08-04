import { BadRequestException, Injectable } from '@nestjs/common';
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



  async update(UserData: User, id:string) {
    if(!(await this.prisma.user.count({
      where: {id}
    }))){
      throw new Error("Usuario não encontrado")
    }
    const data: any = {};
    if(UserData.email){
      data.email = UserData.email
    }
    if(UserData.name){
      data.name = UserData.name
    }
    if(UserData.password){
      const newPassword =  await bcypt.hash(UserData.password, 10)
      data.password = newPassword
    }

    await this.prisma.user.update({
      where: { id}, 
      data
    })
     return this.findAll()
  }



  remove(id: string) {
    try{
      return  this.prisma.user.delete({
        where: {
          id
        }
      })
    }catch(e){
      throw new BadRequestException('Usuario não existe')
    }
    
  }


  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    
    
  }


}
