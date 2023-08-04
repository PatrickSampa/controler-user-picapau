import { User } from "../../entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { IUsersRepository } from "../IUsersRepository";



export class PostgresUsersRepository implements IUsersRepository {
    constructor(private readonly prisma: PrismaService){}
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    update(user: User, id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}