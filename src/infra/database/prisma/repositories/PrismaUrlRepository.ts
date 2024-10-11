import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { UrlRepository } from "src/modules/url/repositories/UrlRepository";
import { Url } from "src/modules/url/entities/url.entity";
import { PrismaUrlMapper } from "../mappers/PrismaUrlMapper";
import { equal } from "assert";

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
    constructor(private prisma: PrismaService){}

    async save(url: Url): Promise<void> {
        const urlRaw = PrismaUrlMapper.toPrisma(url)

        await this.prisma.url.create({
            data: {
                ...urlRaw
            }
        })
    }

    async findByShortId(short_id: string): Promise<Url | null> {
        const url = await this.prisma.url.findUnique({
            where: {
                short_id: short_id,
                AND: {
                    deletedAt: null
                }
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

    async findAllUrlByUser(userId: string, page: number, perPage: number): Promise<Url[] | null> {
        const url = await this.prisma.url.findMany({
            where: {
                createdBy: userId,
                AND: {
                    deletedAt: null
                },
            },
            take: perPage,
            skip: (page - 1) * perPage,
        })
        if (!url) return null;

        return PrismaUrlMapper.toArrayDomain(url);
    }

    async findById(id: string, userId: string): Promise<Url | null> {
        const url = await this.prisma.url.findUnique({
            where: {
                id: id,
                AND: {
                    createdBy: userId,
                    deletedAt: null
                }
            }
        })
        if (!url) return null;

        return PrismaUrlMapper.toDomain(url);
    }

    async updateUrlDestiny(urlId: string, newOriginUrl: string): Promise<void> {
        await this.prisma.url.update({
            where: {
                id: urlId,
                AND: {
                    deletedAt: null
                }
            },
            data: {
                originUrl: newOriginUrl,
                updatedAt: new Date()
            }
        })
    }

    async deleteUrl(urlId: string, userId: string): Promise<void> {
        await this.prisma.url.update({
            where: {
                id: urlId,
                AND: {
                    createdBy: userId,
                    deletedAt: null
                }
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

}