import {Request } from 'express'

export class AuthenticatedRequestModel extends Request {
    user: {
        id: string
        email: string;
        createdAt: string;
    }
}