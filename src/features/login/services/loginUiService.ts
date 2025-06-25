import { exceptions } from '@/lib/exceptions/exceptions';
import httpClient from '@/lib/httpClient';
import { TUserWithToken } from '@/features/user/types/TUser';
import { AxiosError } from 'axios';
import TLogin from '../types/TLogin';

export const signIn = async (login: TLogin) => {
  try {
    const response = await httpClient.Post<TUserWithToken>('/api/login', login);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw exceptions(error);
    }
    throw new Error('Erro inesperado');
  }
};
export const signOut = async () => {
  try {
    const response = await httpClient.Get<TUserWithToken>('/api/login/signout');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw exceptions(error);
    }
    throw new Error('Erro inesperado');
  }
};
