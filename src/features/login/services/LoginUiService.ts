import httpClient from '@/lib/httpClient';
import { AxiosError } from 'axios';
import TLogin from '../types/TLogin';
import { TUserWithToken } from '@/types/TUser';
import { exceptions } from '@/lib/exceptions/exceptions';

export const signIn = async (login: TLogin) => {
  try {
    const response = await httpClient.Post<TUserWithToken>('/api/login', login);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      exceptions(error.response?.data.message);
    }
    throw new Error('Erro inesperado');
  }
};
