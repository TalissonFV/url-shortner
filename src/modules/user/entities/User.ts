import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface UserSchema {
    email: string;
    password: string;
    createdAt: Date;
}

export class User {
    private props: UserSchema;
    _id: string

    constructor(props: Replace<UserSchema, {createdAt?: Date}>, id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
        }
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }
    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.props.password = password;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    set createdAt(createdAt: Date) {
        this.props.createdAt = createdAt;
    }
}