import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Example } from 'src/db/models/example.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { ExampleResponseDto } from './response-dto/example.response-dto';

@Injectable()
export class ExampleService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectModel(Example.name) private readonly exampleModel: Model<Example>
  ) {}

  async create(data: CreateExampleDto) {
    const example = new this.exampleModel(data);
    await example.save();

    return plainToInstance(ExampleResponseDto, example);
  }

  getCacheTime() {
    const now = new Date().toISOString();
    return {
      now,
    };
  }

  addQueue() {
    // send to topic exchange
    this.amqpConnection.channel.sendToQueue(
      'test-queue',
      Buffer.from(
        JSON.stringify({
          message: 'hello',
          time: new Date().toISOString(),
        }),
      ),
    );
  }

  addExchange() {
    // send to topic exchange
    this.amqpConnection.publish('amq.topic', 'test-queue', {
      pattern: 'test-queue',
      data: {
        message: 'hello',
        time: new Date().toISOString(),
      },
    });
  }
}
