import { ApiError } from './ApiError';

export class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}