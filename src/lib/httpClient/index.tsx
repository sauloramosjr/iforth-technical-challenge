import { THttpResponsePaginated } from '@/types/THttpResponse';
import axiosInstance from './axiosInstance';

type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

const Get = async <T = any>(url: string, params?: any): Promise<ApiResponse<THttpResponsePaginated<T>>> => {
  const response = await axiosInstance.get<THttpResponsePaginated<T>>(url, { params });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Post = async <T = any>(url: string, body?: any): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<T>(url, body);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Put = async <T = any>(url: string, body?: any): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.put<T>(url, body);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Delete = async <T = any>(url: string): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.delete<T>(url);
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
