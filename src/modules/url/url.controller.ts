import { Controller, Get, Body, Patch, Param, Request, Res, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlViewModel } from './viewModel/urlViewModel';
import { Response } from 'express';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { UrlListViewModel } from './viewModel/urlListViewModel';
import { DeleteUrlDto } from './dto/delete-url.dto';
import { ListAllUrlDto } from './dto/list-all-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Get('list')
  async findAll(@Res() res: Response, @Request() request: AuthenticatedRequestModel, @Body() listAllUrlDto?: ListAllUrlDto) {
    const user = request.user
    const url = await this.urlService.findAll(user.id, listAllUrlDto);

    return res.send(UrlListViewModel.toHttp(url))
  }

  @Patch('update-destiny')
  async update(@Body() updateUrlDto: UpdateUrlDto, @Request() request: AuthenticatedRequestModel) {
    const { id: userId } = request.user
    const url = await this.urlService.update(updateUrlDto, userId);

    return UrlViewModel.toUrlObejct(url)
  }

  @Delete('delete')
  async remove(@Body() body: DeleteUrlDto, @Request() request: AuthenticatedRequestModel) {
    const { id: userId } = request.user
    const urlId = body.urlId
    await this.urlService.remove(urlId, userId);
    
  }
}
