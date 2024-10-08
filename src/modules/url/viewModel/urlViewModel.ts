import { Url } from "@prisma/client";

export class UrlViewModel {
    static toHttp({short_id}: Url) {
        const newUrl = `http://localhost:3000/${short_id}`
        return {
            shortened_url: newUrl
        }
    }
}