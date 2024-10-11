import { Url } from "@prisma/client";

export class UrlListViewModel {
    static toHttp(url: Url[]) {

        const urlView = url.map(url => {
            return {
                id: url.id,
                accessed_amount: url.clickedAmount,
                created_at: url.createdAt,
                updated_at: url.updatedAt,
                url_destiny: url.originUrl,
                shortened_url: `http://localhost:3000/${url.short_id}`
            }
        })
        return urlView
    }
}