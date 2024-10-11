import { Injectable } from '@nestjs/common';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { UrlRepository } from './repositories/UrlRepository';
import { ListAllUrlDto } from './dto/list-all-url.dto';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async findAll(userId: string, listAllUrlDto: ListAllUrlDto): Promise<Url[] | null> {
    const page = listAllUrlDto.page || 1
    const perPage = listAllUrlDto.perPage || 20

    const urls = await this.urlRepository.findAllUrlByUser(userId, page, perPage)

    return urls
  }

  async update(updateUrlDto: UpdateUrlDto, userId: string): Promise<Url | null> {
    const { urlId, newUrlDestiny } = updateUrlDto
    const url = await this.urlRepository.findById(urlId, userId)


    if(url && (url.originUrl !== newUrlDestiny)) {
      url.originUrl = newUrlDestiny
      await this.urlRepository.updateUrlDestiny(urlId, newUrlDestiny)
    }

    return url
  }

  async remove(urlId: string, userId: string) {
    const url = await this.urlRepository.deleteUrl(urlId, userId)
  }
}
