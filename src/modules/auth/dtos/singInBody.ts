import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SingInBody {
    @ApiProperty({
        type: String,
        required: true,
        default: "email@email.com",
        description: 'Email do usuario cadastrado'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        default: "123123",
        description: 'Senha do usuario cadastrado',
        minLength: 3,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}