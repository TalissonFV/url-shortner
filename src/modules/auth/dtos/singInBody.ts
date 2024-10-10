import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SingInBody {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}