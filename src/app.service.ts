import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './modules/url/dto/create-url.dto';
import { Url } from './modules/url/entities/url.entity';
import { UrlRepository } from './modules/url/repositories/UrlRepository';

@Injectable()
export class AppService {
    constructor(private readonly urlRepository: UrlRepository) {}
    create(createUrlDto: CreateUrlDto) {
        const url = new Url({
          ...createUrlDto
        });
        this.urlRepository.save(url)
        return url
    }


  async findShortUrl(shortId: string): Promise<Url | null> {

    const url = await this.urlRepository.findByShortId(shortId)
    if (url) {
      await this.urlRepository.updateClick(shortId)
    }
    return url
  }
}
