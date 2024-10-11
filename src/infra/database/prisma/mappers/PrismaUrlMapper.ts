
import { Url as UrlRaw } from "@prisma/client"
import { Url } from "src/modules/url/entities/url.entity";

export class PrismaUrlMapper {
    static toPrisma({id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt, clickedAmount}: Url): UrlRaw {
        return {id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt, clickedAmount}
    }

    static toDomain({ id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt }: UrlRaw): Url {
        return new Url({
            createdAt,
            originUrl,
            createdBy,
            deletedAt,
            updatedAt 
        }, id, short_id)
    }
}