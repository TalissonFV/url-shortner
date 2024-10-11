import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Res, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlViewModel } from './viewModel/urlViewModel';
import { Public } from '../auth/decorators/isPublic';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @UseGuards(JwtAuthGuard)
  @Post('short')
  @Public()
  create(@Body() createUrlDto: CreateUrlDto) {
    const shortenedUrl = this.urlService.create(createUrlDto);
    return UrlViewModel.toHttp(shortenedUrl)
  }

  @Public()
  @Get(':short_id')
  async findShortUrl(@Param('short_id') shortId: string, @Res() res: Response) {
    const url = await this.urlService.findShortUrl(shortId);

    return url ? res.redirect(301, url.originUrl) : res.sendStatus(404)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlService.update(+id, updateUrlDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
