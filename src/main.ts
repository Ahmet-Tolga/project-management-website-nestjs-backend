import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes( new ValidationPipe({transform: true}))
  app.enableCors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:"Content-Type,Authorization",
  })

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Morphosium Test API')
  .setDescription('Test API project for Morphosium')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();
