import { User } from '../entities/User'

type Override = Partial<User>

export const makeUser = ({id, ...override}: Override) => {
    return new User({
        email: "email@gmail.com",
        password: "123123",
        ...override
    }, id)
}