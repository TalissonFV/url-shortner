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

  async update(id: string, updateUrlDto: UpdateUrlDto) {
    // const url = await this.urlRepository.findById() 
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
