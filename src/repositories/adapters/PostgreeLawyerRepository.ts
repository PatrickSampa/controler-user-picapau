import { Injectable } from "@nestjs/common";
import { ILawyerRepository } from "../ILawyerRepository";
import { CreateAdvogadoDto } from "../../dto/create-advogado.dto";
import { deleteAdvogadoDTO } from "../../dto/deleteadvogado.dto";
import { Advogados } from "../../entities/advogado.entity";
import { User } from "../../entities/user.entity";
import { advogados } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateAdvogadoDTO } from "../../dto/update-advogado.dto";



@Injectable()
export class PostgresLawyerRepository implements ILawyerRepository{
    constructor(private readonly prisma: PrismaService){}


    async create(lawyer: advogados): Promise<Advogados> {
        return await this.prisma.advogados.create({
            data: lawyer
        })
    }


    async advogadosAll(): Promise<Advogados[]> {
        return await this.prisma.advogados.findMany()
    }


    async update(idUser: string, advogado: UpdateAdvogadoDTO): Promise<Advogados> {

    
        return await this.prisma.advogados.update({
            where: { id: advogado.id},
            data: advogado
        })
    }
    
    remove(token: string, advogado: deleteAdvogadoDTO): Promise<Advogados> {
        throw new Error("Method not implemented.");
    }


    async advogadosAllUser(id: string): Promise<Advogados[]> {
        return await this.prisma.advogados.findMany({
            where: {
                userId : id
            }
        })
    }


    findByName(name: string, id: string): Promise<Advogados> {
        throw new Error("Method not implemented.");
    }
    
}