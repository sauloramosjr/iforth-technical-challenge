import apiClient from '@/lib/httpClient/httpClient';
import TCreateProduct from '../types/TCreateProduct';
import handleError from '@/lib/exceptions/HandleError';
import { Product } from '@/lib/orm/generated';
import TUpdateProduct from '../types/TUpdateProduct';

const getAll = async ({ page, limit }: { page: string; limit: string }) => {
  let params = '';
  if (page && limit) {
    params = `?page=${page}&limit=${limit}`;
  }

  try {
    const { data } = await apiClient.Get<Product[]>(
      '/api/registers/products' + params
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};
const getOne = async (id: string) => {
  try {
    const { data } = await apiClient.Get<Product[]>(
      '/api/registers/products/' + id
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
const create = async (dto: TCreateProduct) => {
  try {
    const { data } = await apiClient.Post('/api/registers/products', dto);
    return data;
  } catch (error) {
    handleError(error);
  }
};
const update = async (dto: TUpdateProduct) => {
  try {
    const { data } = await apiClient.Post('/api/registers/products', dto);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export default {
  getAll,
  create,
  getOne,
  update,
};
