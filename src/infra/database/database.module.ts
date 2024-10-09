import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UrlRepository } from "src/modules/url/repositories/UrlRepository";
import { PrismaUrlRepository } from "./prisma/repositories/PrismaUrlRepository";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaUserRepository } from "./prisma/repositories/PrismaUserRepository";



@Module({
    providers: [PrismaService,{
            provide: UrlRepository,
            useClass: PrismaUrlRepository
        },
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
    ],
    exports: [UrlRepository, UserRepository],
})
export class DatabaseModule {

}