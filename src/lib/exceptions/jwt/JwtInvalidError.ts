import { BaseError } from '../BaseError';

export class JwtInvalidError extends BaseError {
  constructor(message: string = 'Token inválido.') {
    super(message, 401);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}