import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { UrlRepository } from './repositories/UrlRepository';
import { User } from '../user/entities/User';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}


  create(createUrlDto: CreateUrlDto) {
    const url = new Url({
      ...createUrlDto
    });
    this.urlRepository.save(url)
    return url
  }

  async findAll(userId: string): Promise<Url[] | null> {
    const urls = await this.urlRepository.findAllUrlByUser(userId)

    return urls
  }

  async findShortUrl(shortId: string): Promise<Url | null> {

    const url = await this.urlRepository.findByShortId(shortId)
    if (url) {
      await this.urlRepository.updateClick(shortId)
    }
    return url
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
