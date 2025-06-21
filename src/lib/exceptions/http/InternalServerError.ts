import { BaseError } from '../BaseError';

export class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error') {
    super(message,500);
    this.name = 'InternalServerError';
  }
}
