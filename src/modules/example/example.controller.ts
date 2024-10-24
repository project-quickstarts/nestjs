import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ExampleService } from './example.service';
import {
  CreateExampleDto,
  CreateExampleSchema,
} from './dto/create-example.dto';
import { CacheTTL } from '@nestjs/cache-manager';
import { Response } from 'express';
import { zodToOpenAPI } from 'nestjs-zod';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @ApiBody({
    // type: CreateExampleDto,
    schema: zodToOpenAPI(CreateExampleSchema),
    // schema: {
    //   allOf: [
    //     {
    //       type: 'object',
    //       properties: {
    //         name: { type: 'string' },
    //         age: {
    //           type: 'integer',
    //           minimum: 18,
    //           exclusiveMinimum: false,
    //           maximum: 100,
    //           exclusiveMaximum: false,
    //         },
    //       },
    //       required: ['name', 'age'],
    //     },
    //   ],
    // },
  })
  async create(@Body() data: CreateExampleDto) {
    return await this.exampleService.create(data);
  }

  @Get('cache-time')
  @CacheTTL(5000) // 1s
  getCacheTime() {
    return this.exampleService.getCacheTime();
  }

  @Post('add-queue')
  addQueue(@Res() res: Response) {
    this.exampleService.addQueue();
    res.sendStatus(200);
  }

  @Post('add-exchange')
  addExchange(@Res() res: Response) {
    this.exampleService.addExchange();
    res.sendStatus(200);
  }
}
