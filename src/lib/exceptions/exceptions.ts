import { JWTExpired, JWTInvalid } from 'jose/errors';
import { ApiError } from './http/ApiError';
import { BadRequestError } from './http/BadRequestError';
import { ForbiddenError } from './http/ForbiddenError';
import { InternalServerError } from './http/InternalServerError';
import { NotFoundError } from './http/NotFoundError';
import { UnauthorizedError } from './http/UnauthorizedError';
import { JwtInvalidError } from './jwt/JwtInvalidError';
import { BaseError } from './BaseError';
import { JwtExpiredError } from './jwt/JwtExpiredError';

export const exceptions = (error: any): Error => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Erro desconhecido';

  if (error instanceof BaseError) {
    return error;
  }

  if (error instanceof JWTExpired) {
    return new JwtExpiredError();
  }

  if (error instanceof JWTInvalid) {
    return new JwtInvalidError();
  }

  switch (status) {
    case 400:
      return new BadRequestError(message);
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    case 500:
      return new InternalServerError(message);
    default:
      return new ApiError(message, status || 0);
  }
};
