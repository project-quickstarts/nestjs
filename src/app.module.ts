import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import config from './config/config';
import { APP_INTERCEPTOR, MiddlewareBuilder } from '@nestjs/core';
import { AccessLogMiddleware } from './common/middleware/access-log.middleware';
import { ExampleModule } from './modules/example/example.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisConfigProps } from './config/config.interface';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
        includeSubfolders: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(__dirname, '../src/i18n/i18n.generated.ts'),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfigProps>('redis');
        return {
          isGlobal: true,
          store: await redisStore(
            redisConfig.cluster
              ? {
                  connectionName: redisConfig.connectionName,
                  username: redisConfig.username,
                  password: redisConfig.password,
                  db: redisConfig.dbNum,
                  clusterConfig: {
                    nodes: [
                      {
                        host: redisConfig.host,
                        port: redisConfig.port,
                      },
                    ],
                  },
                }
              : {
                  connectionName: redisConfig.connectionName,
                  host: redisConfig.host,
                  port: redisConfig.port,
                  username: redisConfig.username,
                  password: redisConfig.password,
                  db: redisConfig.dbNum,
                },
          ),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db').uri,
      }),
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareBuilder): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
