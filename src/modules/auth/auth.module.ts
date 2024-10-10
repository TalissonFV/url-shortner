import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase/validateUserUseCase";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { SingInDTOValidateMiddleware } from "./middlewares/singInDTOValidate.middleware";
import { SignInUseCase } from "src/modules/auth/useCases/singInUseCase/singInUseCase";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [DatabaseModule, UserModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: process.env.JWT_EXPIRES_IN}
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase]
})

export class AuthModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SingInDTOValidateMiddleware).forRoutes("/login");
    }
}