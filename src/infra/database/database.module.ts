import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UrlRepository } from "src/modules/url/repositories/UrlRepository";
import { PrismaUrlRepository } from "./prisma/repositories/PrismaUrlRepository";

@Module({
    providers: [PrismaService,{
            provide: UrlRepository,
            useClass: PrismaUrlRepository
        },
    ],
    exports: [UrlRepository],
})
export class DatabaseModule {

}