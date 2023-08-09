import { User } from "../entities/user.entity";

export interface IUsersRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    update(user: User, id: string): Promise<User>;
    remove(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}