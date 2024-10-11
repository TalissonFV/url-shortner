import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginSchema {
    @ApiProperty({
        type: String,
        required: true,
        default: 'email@email.com',
        description: 'Email para login do usuario'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        required: true,
        default: '123',
        description: 'Senha para login do usuario',
        minLength: 3
    })
    @IsString()
    @IsNotEmpty()
    password: string
}