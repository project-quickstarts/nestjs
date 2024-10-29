import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { LogicException } from '../exceptions/logic.exception';

@Catch(LogicException)
export class LogicExceptionFilter implements ExceptionFilter {
  catch(exception: LogicException, host: ArgumentsHost) {
    console.log('Catch LogicException :>> ', exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status;

    response.status(status).json({
      cd: 1,
      message: exception.message,
      code: exception.code,
      errors: exception.errors,
      data: exception.data,
    });
  }
}
