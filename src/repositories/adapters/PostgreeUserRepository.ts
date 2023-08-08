import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { IUsersRepository } from "../IUsersRepository";



@Injectable()
export class PostgresUsersRepository implements IUsersRepository {
    constructor(private readonly prisma: PrismaService){}


    async create(user: User): Promise<User> {
        const createUser = await this.prisma.user.create({
            data: user
          })
          return createUser
    }



    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany(); 
    }



    async update(user: User, id: string): Promise<User> {
        const userUpdate = await this.prisma.user.update({
            where: { id}, 
            data: user
          })
          return this.findByEmail(userUpdate.email)
          
    }


    remove(id: string): Promise<User> {
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


    async findByEmail(email: string): Promise<User> {
        return await this.prisma.user.findFirst({
            where: {
              email
            }
          })
    }

}