import { User } from "src/modules/user/entities/User";

export class UserViewModel {
    static toHttp({email, createdAt, id}: User) {
        return {email, createdAt, id}
    }
}