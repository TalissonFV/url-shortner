import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class LoginResponseSchema {
    @ApiProperty({
        type: String,
        required: true,
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWNiZGU2YS1kOTlhLTQ1MGUtOTBiZS1iODcyYWVkNjE3YTQiLCJlbWFpbCI6InRhbGlzc29uMkBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTEwVDIyOjE1OjA3LjE0NFoiLCJpYXQiOjE3Mjg1OTg1MTEsImV4cCI6MTczMTE5MDUxMX0.6fhsrx6ZiY0jAZEToUEM1wmNki6WvsGOyKCHGyBoLlU',
        description: 'JWT Token utilizado para autenticação'
    })
    @IsString()
    access_token: string

}