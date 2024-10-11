import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/isPublic';
import { CreateUrlDto } from './modules/url/dto/create-url.dto';
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard';
import { UrlViewModel } from './modules/url/viewModel/urlViewModel';
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
    @UseGuards(JwtAuthGuard)
    @Post('short')
    @Public()
    create(@Body() createUrlDto: CreateUrlDto) {
      const shortenedUrl = this.appService.create(createUrlDto);
      return UrlViewModel.toHttp(shortenedUrl)
    }

    @Public()
    @Get(':short_id')
    async findShortUrl(@Param('short_id') shortId: string, @Res() res: Response) {
      const url = await this.appService.findShortUrl(shortId);

      return url ? res.redirect(301, url.originUrl) : res.sendStatus(404)
    }
}
