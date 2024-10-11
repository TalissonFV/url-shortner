import { Controller, Get, Post, Body, Patch, Param, Request, Res, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlViewModel } from './viewModel/urlViewModel';
import { Public } from '../auth/decorators/isPublic';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { UrlListViewModel } from './viewModel/urlListViewModel';

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

  @Get('url/list')
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response, @Request() request: AuthenticatedRequestModel) {
    const user = request.user
    const url = await this.urlService.findAll(user.id);

    return res.send(UrlListViewModel.toHttp(url))
  }

  @Patch('url/update_destiny')
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateUrlDto: UpdateUrlDto, @Request() request: AuthenticatedRequestModel) {
    const user = request.user
    const url = await this.urlService.update(updateUrlDto, user.id);

    return UrlViewModel.toUrlObejct(url)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
