import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/UserToken';
import { UserService } from '../user/user.service';


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
            throw new Error("Token Invalido")
        }
    }
}
