import { Url } from "../entities/url.entity";

export abstract class UrlRepository {
    abstract save(url:Url): Promise<void>;
}