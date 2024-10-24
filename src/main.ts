import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { ConfigProps } from './config/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const configValues: ConfigProps = config();

  const app = await NestFactory.create(AppModule);

  // Enable Cors
  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });
  //
  // Swagger
  if (configValues.swagger.enable) {
    const options = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API Documentation')
      .setVersion('1.0')
      // .addTag('common')
      // .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(configValues.swagger.path, app, document);
  }

  await app.listen(configValues.port);
  console.log(`Start listening on ${configValues.port}`);
}
bootstrap();
