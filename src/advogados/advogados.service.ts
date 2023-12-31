import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateAdvogadoDto } from '../dto/create-advogado.dto';
import { PrismaService } from '../prisma/prisma.service';
import { newObjectCreateDTO } from '../dto/newObjectCreateAdv.dto';
import { deleteAdvogadoDTO } from '../dto/deleteadvogado.dto';
import { ILawyerRepository } from '../repositories/ILawyerRepository';
import { UpdateAdvogadoDTO } from '../dto/update-advogado.dto';

@Injectable()
export class AdvogadosService {
    constructor(
        @Inject('ILawyerRepository')
        private readonly iLawyerRepository: ILawyerRepository,
        private readonly authService: AuthService){}


    async create(token:string, advogado: CreateAdvogadoDto){
        advogado.name = ((advogado.name).toLowerCase()).replace(/\s+/g, ' ');
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        const newObjectAdv: newObjectCreateDTO = {name: advogado.name, userId: idUser.sub }
        return await this.iLawyerRepository.create(newObjectAdv)
    }

    async remove(token:string, advogado: deleteAdvogadoDTO){
        if(isNaN(advogado.id)){
            throw new BadRequestException(`O ID informado é inválido`)
        }

        if(!(await this.iLawyerRepository.advogadoId(advogado.id))){
            throw new BadRequestException(`O ID informado é inválido`)
        }
        return this.iLawyerRepository.remove(advogado.id)
        
    }


    advogadosAll(){
        return this.iLawyerRepository.advogadosAll()
    }

    async advogadosAllUser(token: string){
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        return this.iLawyerRepository.advogadosAllUser(idUser.sub)
    }

     async update(token: string, advogado: UpdateAdvogadoDTO){
        const idUser = await this.authService.checkToken((token.split(" ")[1]))
        return await this.iLawyerRepository.update(idUser.sub, advogado)
    }

    async findByName(name: string, id: string){
       /*  return this.prisma.advogados.findFirst({
            where: {
                name: name,
                userId:id
            }
        }) */
    }

}
