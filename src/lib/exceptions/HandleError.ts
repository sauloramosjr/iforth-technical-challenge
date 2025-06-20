import { ApiError } from './ApiError';
import { BadRequestError } from './BadRequestError';
import { ForbiddenError } from './ForbiddenError';
import { InternalServerError } from './InternalServerError';
import { NotFoundError } from './NotFoundError';
import { UnauthorizedError } from './UnauthorizedError';

const handleError = (error: any):Error => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Erro desconhecido';

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

export default handleError