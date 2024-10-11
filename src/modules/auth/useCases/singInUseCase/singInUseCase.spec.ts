import { JwtService } from "@nestjs/jwt"
import { SignInUseCase } from "./singInUseCase"
import { makeUser } from "src/modules/user/factories/userFactory"
import { UserPayload } from "../../models/UserPayload"

let singInUseCase: SignInUseCase
let jwtService: JwtService

describe('Sing In', () => {
    beforeEach(()=> {
        jwtService = new JwtService({secret: process.env.JWT_SECRET});
        singInUseCase = new SignInUseCase(jwtService);
    })

    it("Deve conseguir validar o token de acesso", async () => {
        const user = makeUser({})

        const token = await singInUseCase.execute({
            user
        });

        const payload = jwtService.decode(token) as UserPayload

        expect(payload.sub).toEqual(user.id)
    })

})