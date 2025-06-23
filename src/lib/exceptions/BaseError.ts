export class BaseError extends Error {
  public status
  constructor(public message: string, statusCode?: number ) {
    super(message);
    this.name = new.target.name;
    this.status = statusCode
    Error.captureStackTrace(this, this.constructor);
  }
}