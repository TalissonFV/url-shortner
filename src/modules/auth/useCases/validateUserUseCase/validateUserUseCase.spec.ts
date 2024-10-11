import { ValidateUserUseCase } from "./validateUserUseCase"
import { UserRepositoryInMemory } from "src/modules/user/repositories/UserRepositoryInMemory"
import { hash } from "bcrypt"
import { makeUser } from "../../../user/factories/userFactory"
import { UnauthorizedException } from "@nestjs/common"

let validateUserUseCase: ValidateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Validação de Usuario', () => {
    beforeEach(()=> {
        userRepositoryInMemory = new UserRepositoryInMemory();
        validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
    })

    it("Deve retornar o usuario se email e senha estiver corretos", async () => {

        const userPasswordWithoutEncryption = "360"
        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10)
        })

        userRepositoryInMemory.users = [user]

        const result = await validateUserUseCase.execute({
            email: user.email,
            password: userPasswordWithoutEncryption
        })

        expect(result).toEqual(user)
    })


    it("Deve dar erro se a senha ou email estiverem incorretos", async () => {
        const userPasswordWithoutEncryption = "360"

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption, 10)
        })

        userRepositoryInMemory.users = [user]


        expect(async () => {
            await validateUserUseCase.execute({
                email: "incorrect@gmail.com",
                password: userPasswordWithoutEncryption
            })
        }).rejects.toThrow(UnauthorizedException)


        expect(async () => {
            await validateUserUseCase.execute({
                email: user.email,
                password: "senha errada"
            })
        }).rejects.toThrow(UnauthorizedException)
    })

})