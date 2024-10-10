import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { UrlRepository } from "src/modules/url/repositories/UrlRepository";
import { Url } from "src/modules/url/entities/url.entity";
import { PrismaUrlMapper } from "../mappers/PrismaUrlMapper";

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
    constructor(private prisma: PrismaService){}
    
    async save(url: Url): Promise<void> {
        const urlRaw = PrismaUrlMapper.toPrisma(url)

        await this.prisma.url.create({
            data: urlRaw
        })
    }

}