
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, NextFunction } from 'express';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    use(req: Request, next: NextFunction) {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].replace("Bearer ", "")
            const { sub } = this.jwtService.decode(token)
            req.body = {
                ...req.body,
                createdBy: sub
            }
        }
        next();
    }
}
