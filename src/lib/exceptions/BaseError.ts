export class BaseError extends Error {
  constructor(public message: string, statusCode?: number ) {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}