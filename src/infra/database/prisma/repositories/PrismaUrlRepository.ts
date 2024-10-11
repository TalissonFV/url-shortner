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

    async findByShortId(short_id: string): Promise<Url | null> {
        const url = await this.prisma.url.findUnique({
            where: {
                short_id: short_id
            }
        })
        if (!url) return null;

        return PrismaUrlMapper.toDomain(url);
    }

    async updateClick(short_id: string): Promise<void> {
        await this.prisma.url.update({
            where: {
                short_id: short_id
            },
            data: {
                clickedAmount: {
                    increment: 1
                }
            }
        })
    }

}