import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { LogicException } from '../exceptions/logic.exception';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // super.catch(exception, host);
    console.log('AllExceptionFilter :>> ', exception, host);

    this.logger.error(exception);

    if (exception instanceof LogicException) {
      console.log('LogicException');
    }

    let body: {
      cd?: number;
      statusCode: number;
      message: string;
      error?: string;
    } = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
    if (exception instanceof HttpException) {
      const httpError = exception as HttpException;
      console.log('httpError :>> ', httpError);
      body = {
        statusCode: httpError.getStatus(),
        message: httpError.message,
        // @ts-ignore
        error: httpError.response?.error,
      };
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
    response.status(body.statusCode).json(body);
  }
}
