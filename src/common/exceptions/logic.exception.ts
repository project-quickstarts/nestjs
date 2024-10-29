interface MessageCode {
  message: string;
  code: string;
}
export class LogicException extends Error {
  status: number;
  code: string | null;
  errors: any[];
  data: any;

  constructor(
    message: string | MessageCode,
    status = 500,
    errors: any[] = [],
    data: any = null,
  ) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
    this.code = typeof message === 'string' ? null : message.code;
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}
