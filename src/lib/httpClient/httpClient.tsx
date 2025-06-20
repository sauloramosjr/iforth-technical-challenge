import { THttpResponsePaginated } from '@/types/THttpResponsePaginated';
import httpClient from './';

type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

const Get = async <T = any>(url: string, params?: any): Promise<ApiResponse<THttpResponsePaginated<T>>> => {
  const response = await httpClient.get<THttpResponsePaginated<T>>(url, { params });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Post = async <T = any>(url: string, body?: any): Promise<ApiResponse<T>> => {
  const response = await httpClient.post<T>(url, body);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Put = async <T = any>(url: string, body?: any): Promise<ApiResponse<T>> => {
  const response = await httpClient.put<T>(url, body);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Delete = async <T = any>(url: string): Promise<ApiResponse<T>> => {
  const response = await httpClient.delete<T>(url);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const apiClient = {
  Get,
  Post,
  Put,
  Delete,
};

export default apiClient;
