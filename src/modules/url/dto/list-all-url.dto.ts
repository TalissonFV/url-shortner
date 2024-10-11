import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListAllUrlDto{
    @ApiProperty({
        type: Number,
        required: false,
        default: 1,
        description: 'Pagina retornada na paginação'
    })
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiProperty({
        type: Number,
        required: false,
        default: 10,
        description: 'Quantidade de registros retornados na paginação'
    })
    @IsNumber()
    @IsOptional()
    perPage?: number;
}