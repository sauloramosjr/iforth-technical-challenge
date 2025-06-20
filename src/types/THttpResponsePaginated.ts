export type THttpResponsePaginated<T> = {
  data: T;
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};
