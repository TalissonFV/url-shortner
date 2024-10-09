import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUrlDto {
    @ApiProperty({
        type: String,
        required: true,
        default: "http://google.com",
        description: 'Url que vai ser encurtada'
    })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    originUrl: string;
}
