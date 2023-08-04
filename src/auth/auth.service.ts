import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/UserToken';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, 
                private readonly userService: UserService){}
    
    
     login(user: User): UserToken {

        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }

    }
    

    async create(createUserDto: CreateUserDto){
        
        if(await this.userService.findByEmail(createUserDto.email)){
            throw new BadRequestException('E-mail já cadastrado')
        }

        return await this.userService.create(createUserDto)
        
    }
    

    findAll() {
        return this.userService.findAll();
      }
    



     async update(token: string, User: UpdateUserDto){
        const { email, name, password } = User
        if(!(await this.userService.findByEmail(email))){
            const UserToken = await this.checkToken((token.split(" ")[1]))
            return await this.userService.update({ email, name, password }, UserToken.sub)
        }
        throw new BadRequestException('Este Email já existe')
     } 



    
      
      async remove(token: string) {
        const userId = await this.checkToken((token.split(" ")[1]))
        
        return this.userService.remove(userId.sub)
      }
      
    
    
    
    
    
    
    
    
    
    
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(isPasswordValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error('Email adress or password provided is incorret.')
    }


    async checkToken(token: string){
        try{
            const data = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            })
            return data
        }catch(e){
            throw new BadRequestException(e)
        }
    }
}
