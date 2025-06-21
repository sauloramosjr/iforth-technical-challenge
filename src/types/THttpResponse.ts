export type THttpResponseSuccess<T> = {
  data: T;
};

export type THttpResponsePaginated<T> = {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
} & THttpResponseSuccess<T>
