import { BadRequestError } from '@/lib/exceptions/BadRequestError';
import { UnauthorizedError } from '@/lib/exceptions/UnauthorizedError';
import httpClient from '@/lib/httpClient';
import TUserWithToken from '@/types/TUserWithToken';
import { AxiosError, AxiosResponse } from 'axios';
import TLogin from '../types/TLogin';

export const signIn = async (login: TLogin) => {
  try {
    const response = await httpClient.post<
      TUserWithToken,
      AxiosResponse<TUserWithToken>,
      TLogin
    >('/api/login', login);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        throw new BadRequestError(error.response.data.message);
      }
      if (error.response?.status === 401) {
        throw new UnauthorizedError(error.response.data.message);
      }
    }
    throw new Error('Erro inesperado');
  }
};
