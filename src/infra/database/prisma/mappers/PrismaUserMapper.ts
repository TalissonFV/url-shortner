import { User } from "src/modules/user/entities/User";
import { User as UserRaw } from "@prisma/client"

export class PrismaUserMapper {
    static toPrisma({ password, email, createdAt, id }: User): UserRaw {
        return { password, email, createdAt, id }
    }

    static toDomain({ id, createdAt, password, email }: UserRaw): User {
        return new User({ createdAt, password, email }, id)
    }
}