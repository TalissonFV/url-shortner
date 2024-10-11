import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUrlDto {
    @ApiProperty({
        type: String,
        required: true,
        default: '123abc',
        description: 'ID de um URL encurtado que foi criado pelo usuario'
    })
    @IsNotEmpty()
    @IsString()
    urlId: string;

    @ApiProperty({
        type: String,
        required: true,
        default: 'http://google.com',
        description: 'Novo endereço de destino para o URL encurtado que foi criado pelo usuario'
    })
    @IsNotEmpty()
    @IsUrl()
    newUrlDestiny: string;
}
