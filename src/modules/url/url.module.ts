import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { BearerTokenMiddleware } from './middlewares/bearerToken.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: process.env.JWT_EXPIRES_IN}
})],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).forRoutes("/url/short");
  }
}
