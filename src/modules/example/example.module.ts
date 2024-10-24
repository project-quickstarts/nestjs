import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from 'src/db/models/example.schema';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'amq.topic',
            type: 'topic',
          },
        ],
        uri: configService.get('rabbitmq').host,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Example.name, schema: ExampleSchema },
    ]),
],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
