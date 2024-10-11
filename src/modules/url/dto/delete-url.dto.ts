import { PartialType } from '@nestjs/swagger';
import { CreateUrlDto } from './create-url.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUrlDto extends PartialType(CreateUrlDto) {
    @IsNotEmpty()
    @IsString()
    urlId: string;
}
