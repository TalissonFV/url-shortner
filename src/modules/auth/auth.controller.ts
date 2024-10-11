import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/singInUseCase/singInUseCase";
import { Public } from "./decorators/isPublic";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { LoginSchema } from "./schemas/login.schema";
import { LoginResponseSchema } from "./schemas/loginResponse.schema";

@Controller('auth')
export class AuthController {

    constructor(private singInUseCase: SignInUseCase) { }

    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiBody({
        type: LoginSchema,
        description: "Endpoint para autenticar usuario cadastrado. Retorna um JWT Token",
    })
    @ApiOkResponse({
        type: LoginResponseSchema
    })
    async singIn(@Request() request: AuthRequestModel) {
        const access_token = await this.singInUseCase.execute({ user: request.user })

        return { access_token };
    }
}