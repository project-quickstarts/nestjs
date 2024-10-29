import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Catch HttpExceptionFilter :>> ', exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log('HttpExceptionFilter.exception :>> ', exception);
    const data = {
      statusCode: status,
      message: exception.message,
    }
    
    if (exception instanceof ZodValidationException) {
      const httpError = exception as ZodValidationException;
      console.log('httpError :>> ', httpError);
      data['errors'] = httpError.getZodError().issues;
    }

    response.status(status).json(data);
  }
}
