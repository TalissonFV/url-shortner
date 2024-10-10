import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface UrlSchema {
    originUrl: string;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    deletedAt?: Date;
    clickedAmount?: number;
}

export class Url {
    private props: UrlSchema;
    _id: string;
    _short_id: string;

    constructor(props: Replace<UrlSchema, { createdAt?: Date, createdBy?: string, updatedAt?: Date, deletedAt?: Date, clickedAmount?: number }>, id?: string, short_id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            createdBy: props.createdBy || '',
            updatedAt: props.updatedAt || null,
            deletedAt: props.deletedAt || null,
            clickedAmount: props.clickedAmount || 0
        }
        this._id = id || randomUUID();
        this._short_id = short_id || Math.random().toString(36).slice(-6)
    }

    get id(): string {
        return this._id;
    }

    get short_id(): string {
        return this._short_id;
    }

    get originUrl(): string {
        return this.props.originUrl;
    }

    set originUrl(originUrl: string) {
        this.props.originUrl = originUrl;
    }

    get createdBy(): string {
        return this.props.createdBy;
    }

    set createdBy(createdBy: string) {
        this.props.createdBy = createdBy;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    set createdAt(createdAt: Date) {
        this.props.createdAt = createdAt;
    }

    get deletedAt(): Date {
        return this.props.deletedAt;
    }

    set deletedAt(deletedAt: Date) {
        this.props.deletedAt = deletedAt;
    }

    get clickedAmount(): number {
        return this.props.clickedAmount;
    }

    set clickedAmount(clickedAmount: number) {
        this.props.clickedAmount = clickedAmount;
    }

}