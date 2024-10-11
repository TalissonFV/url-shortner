import { PartialType } from '@nestjs/swagger';
import { CreateUrlDto } from './create-url.dto';
import { IsNumber } from 'class-validator';

export class ListAllUrlDto extends PartialType(CreateUrlDto) {
    @IsNumber()
    page?: number;

    @IsNumber()
    perPage?: number;
}