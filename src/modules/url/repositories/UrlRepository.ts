import { Url } from "../entities/url.entity";

export abstract class UrlRepository {
    abstract save(url:Url): Promise<void>;
    abstract findByShortId(short_id:string): Promise<Url | null>;
    abstract updateClick(short_id:string): Promise<void>
    abstract findAllUrlByUser(id:string, page: number, perPage: number): Promise<Url[] | null>;
    abstract findById(id:string, userId: string): Promise<Url | null>;
    abstract updateUrlDestiny(urlId: string, newOriginUrl: string): Promise<void>
    abstract deleteUrl(urlId:string, userId: string): Promise<void>
}