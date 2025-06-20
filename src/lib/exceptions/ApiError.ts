
import { HttpError } from './HttpError';

export class ApiError extends HttpError {
  status: number;
  constructor(message: string, status: number) {
    super(status,message);
    this.name = 'ApiError';
    this.status = status;
  }
}
