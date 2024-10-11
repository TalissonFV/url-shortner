import { Url } from "@prisma/client";

export class UrlViewModel {
    static toHttp({ short_id }: Url) {
        const newUrl = `http://localhost:3000/${short_id}`
        return {
            shortened_url: newUrl
        }
    }

    static toUrlObejct(url: Url) {
        return {
            id: url.id,
            accessed_amount: url.clickedAmount,
            created_at: url.createdAt,
            updated_at: url.updatedAt,
            url_destiny: url.originUrl,
            shortened_url: `http://localhost:3000/${url.short_id}`
        }
    }
}