
import { BaseError } from '../BaseError';

export class ApiError extends BaseError {
  status: number;
  constructor(message: string, status: number) {
    super(message,status);
    this.name = 'ApiError';
    this.status = status;
  }
}
