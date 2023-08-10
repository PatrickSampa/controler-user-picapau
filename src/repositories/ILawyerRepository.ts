import { advogados } from "@prisma/client";
import { CreateAdvogadoDto } from "../dto/create-advogado.dto";
import { deleteAdvogadoDTO } from "../dto/deleteadvogado.dto";
import { Advogados } from "../entities/advogado.entity";
import { User } from "../entities/user.entity";
import { newObjectCreateDTO } from "../dto/newObjectCreateAdv.dto";
import { UpdateAdvogadoDTO } from "../dto/update-advogado.dto";

export interface ILawyerRepository {
    create(lawyer: newObjectCreateDTO): Promise<Advogados>;
    advogadosAll(): Promise<Advogados[]>;
    update(idUser: string, advogado: UpdateAdvogadoDTO): Promise<Advogados>;
    remove(id: number): Promise<Advogados>;
    advogadosAllUser(id: string): Promise<Advogados[]>;
    findByName(name: string, id: string): Promise<Advogados>;
    advogadoId(id: number): Promise<Advogados>
}