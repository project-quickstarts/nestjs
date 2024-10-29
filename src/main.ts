import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { ConfigProps } from './config/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LogicExceptionFilter } from './common/filters/logic-exception.filter';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

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
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(configValues.swagger.path, app, document);
  }

  app.useGlobalFilters(
    new AllExceptionFilter(),
    new HttpExceptionFilter(),
    new LogicExceptionFilter(),
    new I18nValidationExceptionFilter({
      detailedErrors: true,
      errorHttpStatusCode: 400,
    }),
  );

  await app.listen(configValues.port);
  console.log(`Start listening on ${configValues.port}`);
}
bootstrap();
