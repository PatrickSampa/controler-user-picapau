import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateAdvogadoDto } from '../dto/create-advogado.dto';
import { PrismaService } from '../prisma/prisma.service';
import { newObjectCreateDTO } from '../dto/newObjectCreateAdv.dto';
import { deleteAdvogadoDTO } from '../dto/deleteadvogado.dto';

@Injectable()
export class AdvogadosService {
    constructor(private readonly authService: AuthService, 
        private readonly prisma: PrismaService){}


    async create(token:string, advogado: CreateAdvogadoDto){
        advogado.name = ((advogado.name).toLowerCase()).replace(/\s+/g, ' ');
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        const newObjectAdv: newObjectCreateDTO = {name: advogado.name, userId: idUser.sub }
        return await this.prisma.advogados.create({
            data: newObjectAdv
        })
    }

    async remove(token:string, advogado: deleteAdvogadoDTO){
        advogado.name = ((advogado.name).toLowerCase()).replace(/\s+/g, ' ');
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        const advEncontrado = await this.findByName(advogado.name, idUser.sub)
        if(advEncontrado){
            return await this.prisma.advogados.delete({
                where:{
                    id: advEncontrado.id
                }
            })
        }
        throw new BadRequestException('Advogado não existe no banco')
        
    }


    advogadosAll(){
        return this.prisma.advogados.findMany()
    }

    async advogadosAllUser(token: string){
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        return this.prisma.advogados.findMany({
            where: {
                userId :  idUser.sub
            }
        })
    }


    async findByName(name: string, id: string){
        return this.prisma.advogados.findFirst({
            where: {
                name: name,
                userId:id
            }
        })
    }

}
