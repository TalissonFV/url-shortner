
import { Url as UrlRaw } from "@prisma/client"
import { Url } from "src/modules/url/entities/url.entity";

export class PrismaUrlMapper {
    static toPrisma({id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt}: Url): UrlRaw {
        return {id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt}
    }
}