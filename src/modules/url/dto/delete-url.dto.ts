import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUrlDto {
    @ApiProperty({
        type: String,
        required: true,
        default: '123abc',
        description: 'ID de um URL encurtado que foi criado pelo usuario'
    })
    @IsNotEmpty()
    @IsString()
    urlId: string;
}
