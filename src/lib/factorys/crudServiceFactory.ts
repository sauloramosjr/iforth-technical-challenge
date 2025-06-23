import { exceptions } from '@/lib/exceptions/exceptions';
import httpClient from '@/lib/httpClient';

type QueryOptions<T> = {
  page?: string;
  limit?: string;
  filters?: Record<string, any>;
  select?: (keyof T)[];        // Agora o select é array de strings (ex: ['id', 'name', 'product.name'])
  sort?: string;            // Exemplo: 'createdAt:desc'
};

function crudServiceFactory<TItem, TCreate, TUpdate, TFlag>(baseUrl: string) {
  const getAll = async ({ page, limit, filters, select, sort }: QueryOptions<TItem> = {}) => {
    try {
      const query: Record<string, any> = { page, limit };

      if (select && select.length > 0) {
        query.fields = select.join(',');
      }

      if (sort) {
        query.sort = sort;
      }

      const { data } = await httpClient.Get<TItem[]>(baseUrl, {
        query,
        filters,
      });

      return data;
    } catch (error) {
      throw exceptions(error);
    }
  };

  const getOne = async (id: string) => {
    try {
      const { data } = await httpClient.Get<TItem>(`${baseUrl}/${id}`);
      return data;
    } catch (error) {
      throw exceptions(error);
    }
  };

  const create = async (dto: TCreate) => {
    try {
      const { data } = await httpClient.Post<TItem>(baseUrl, dto);
      return data;
    } catch (error) {
      throw exceptions(error);
    }
  };

  const update = async (dto: TUpdate) => {
    try {
      const { data } = await httpClient.Post<TItem>(baseUrl, dto);
      return data;
    } catch (error) {
      throw exceptions(error);
    }
  };

  const changeStatus = async (dto: TFlag) => {
    try {
      const { data } = await httpClient.Put<TItem>(`${baseUrl}/flag`, dto);
      return data;
    } catch (error) {
      throw exceptions(error);
    }
  };

  return {
    getAll,
    getOne,
    create,
    update,
    changeStatus,
  };
}

export default crudServiceFactory;
