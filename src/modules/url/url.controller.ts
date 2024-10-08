import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlViewModel } from './viewModel/urlViewModel';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('short')
  create(@Body() createUrlDto: CreateUrlDto) {
    const shortenedUrl = this.urlService.create(createUrlDto);
    return UrlViewModel.toHttp(shortenedUrl)
  }

  // @Get()
  // findAll() {
  //   return this.urlService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.urlService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlService.update(+id, updateUrlDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
