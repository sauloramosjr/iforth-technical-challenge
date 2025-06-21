import { BaseError } from '../BaseError';

export class JwtExpiredError extends BaseError {
  constructor(message: string = "Sua sessão expirou!") {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}