import { Url } from "../entities/url.entity";

export abstract class UrlRepository {
    abstract save(url:Url): Promise<void>;
    abstract findByShortId(short_id:string): Promise<Url | null>;
    abstract updateClick(short_id:string): Promise<void>
    abstract findAllUrlByUser(id:string): Promise<Url[] | null>;
    abstract findById(id:string, userId): Promise<Url | null>;
    abstract updateUrlDestiny(urlId: string, newOriginUrl: string): Promise<void>
}