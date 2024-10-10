import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserBody {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}