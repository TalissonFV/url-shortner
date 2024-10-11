import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Encurtador de URL')
    .setDescription('Encurtador de URL criado para teste tecnico da Teddy')
    .setVersion('1.0')
    .addBearerAuth(
      {
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'JWTAuthorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
