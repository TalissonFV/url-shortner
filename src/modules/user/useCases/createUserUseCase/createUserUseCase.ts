import { Injectable } from "@nestjs/common";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { hash } from 'bcrypt'

interface CreateUserRequest{
    email: string
    password: string
}

@Injectable()
export class CreateUserUseCase {
    
    constructor(private userRepository: UserRepository) {}
    
    async execute({email, password}: CreateUserRequest) {
        
        const user = new User({
            email,
            password: await hash(password, 10)
        })
        
        await this.userRepository.create(user)

        return user;
    }
}