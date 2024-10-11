
import { Url as UrlRaw } from "@prisma/client"
import { Url } from "src/modules/url/entities/url.entity";

export class PrismaUrlMapper {
    static toPrisma({id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt, clickedAmount}: Url): UrlRaw {
        return {id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt, clickedAmount}
    }

    static toDomain({ id, createdAt, originUrl, createdBy, short_id, deletedAt, updatedAt, clickedAmount }: UrlRaw): Url {
        return new Url({
            createdAt,
            originUrl,
            createdBy,
            deletedAt,
            updatedAt,
            clickedAmount
        }, id, short_id)
    }

    static toArrayDomain(urlRawArray: UrlRaw[]): Url[] {
        const urlArray = urlRawArray.map(url => {
            return new Url({
                createdAt: url.createdAt,
                originUrl: url.originUrl,
                createdBy: url.createdBy,
                deletedAt: url.deletedAt,
                updatedAt: url.updatedAt,
                clickedAmount: url.clickedAmount
            }, url.id, url.short_id)
        })

        return urlArray
    }
}