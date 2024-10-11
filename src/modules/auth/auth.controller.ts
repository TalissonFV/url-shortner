import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/singInUseCase/singInUseCase";
import { Public } from "./decorators/isPublic";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { LocalAuthGuard } from "./guards/localAuth.guard";

@Controller('auth')
export class AuthController {

    constructor(private singInUseCase: SignInUseCase){}

    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async singIn(@Request() request: AuthRequestModel){
        const access_token = await this.singInUseCase.execute({user: request.user})
        
        return {access_token};
    }
}