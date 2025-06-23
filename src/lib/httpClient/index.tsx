import { THttpResponsePaginated } from '@/types/THttpResponse';
import axiosInstance from './axiosInstance';
import { AxiosRequestConfig } from 'axios';

type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

const Get = async <T = any,>(
  url: string,
  options?: {
    query?: Record<string, any>;
    filters?: Record<string, string | number | boolean>;
    fields?: string[];
    sort?: string;
  }
): Promise<ApiResponse<THttpResponsePaginated<T>>> => {
  const searchParams = new URLSearchParams();

  if (options?.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }

  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(`filter[${key}]`, String(value));
      }
    });
  }

  if (options?.fields && options.fields.length > 0) {
    searchParams.append('fields', options.fields.join(','));
  }

  if (options?.sort) {
    searchParams.append('sort', options.sort);
  }

  const queryString = searchParams.toString();
  const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;

  const response = await axiosInstance.get<THttpResponsePaginated<T>>(fullUrl);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Post = async <T = any,>(
  url: string,
  body?: any,
  headers?: AxiosRequestConfig<T>['headers']
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<T>(url, body, { headers });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Put = async <T = any,>(
  url: string,
  body?: any
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.put<T>(url, body);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const Delete = async <T = any,>(url: string): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.delete<T>(url);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

const httpClient = {
  Get,
  Post,
  Put,
  Delete,
};

export default httpClient;
