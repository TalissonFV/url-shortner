import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { UrlRepository } from './repositories/UrlRepository';

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

  findAll() {
    return `This action returns all url`;
  }

  async findShortUrl(shortId: string): Promise<Url | null> {

    const url = await this.urlRepository.findByShortId(shortId)
    if (url) {
      await this.urlRepository.updateClick(shortId)
    }
    return url
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
