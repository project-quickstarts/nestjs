export class ApplicationException extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.code = 'SERVER_ERROR';
  }
}
