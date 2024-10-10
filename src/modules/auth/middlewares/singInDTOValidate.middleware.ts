import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SingInBody } from "../dtos/singInBody";
import { validate } from "class-validator";

export class SingInDTOValidateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body

        const singInBody = new SingInBody()
        singInBody.email = email
        singInBody.password = password

        const validations = await validate(singInBody)
        if(validations.length) {
            throw new BadRequestException(validations)
        }

        next()
    }
}