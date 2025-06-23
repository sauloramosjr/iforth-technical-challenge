'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useNotification } from '@/components/notifications/provider';
import Pagination from '@/components/pagination';
import { ProductFiltersProps } from '@/features/product/components/productFilters';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import ButtonDefault from '../buttonDefault';

type ListPageWrapperProps<T> = {
  fetchData: (args: {
    page: string;
    limit: string;
    filters: Record<string, string>;
    select?: (keyof T)[];
    sort?: string;
  }) => Promise<{
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
  FiltersComponent?: ({
    onChangeFilter,
    searchParams,
  }: ProductFiltersProps) => React.ReactNode;
  tableComponent: (data: T[], isPending: boolean) => React.ReactNode;
  onAdd?: () => void;
  dataChanged?: T;
  sort: string;
};

export function ListPageWrapper<T>({
  fetchData,
  FiltersComponent,
  tableComponent,
  onAdd,
  dataChanged,
  sort,
}: ListPageWrapperProps<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { notify } = useNotification();

  const [data, setData] = useState<T[] | null>(null);
  const [params, setParams] = useState('');
  const [isPending, startTransition] = useTransition();
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const fetchItems = async () => {
    const page = searchParams.get('page') || '';
    const limit = searchParams.get('limit') || '';

    const filters: Record<string, string> = {};
    let select: string[] = [];

    searchParams.forEach((value, key) => {
      const match = key.match(/^filter\[(.*)\]$/);
      if (match) {
        const field = match[1];
        filters[field] = value;
        return;
      }

      if (key === 'fields') {
        select = value.split(',').map((item) => item.trim());
        return;
      }
    });

    try {
      const result = await fetchData({
        page,
        limit,
        filters,
        sort,
        select: select as (keyof T)[],
      });
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      notify(getErrorMessage(err), 'error');
    }
  };

  useEffect(() => {
    startTransition(fetchItems);
  }, [searchParams]);

  useEffect(() => {
    if (!dataChanged) return;

    setData((curr) => {
      if (!curr) return curr;
      return curr.map((item: any) => {
        if (item.id === (dataChanged as any).id) {
          return { ...item, ...dataChanged };
        }
        return item;
      });
    });
  }, [dataChanged]);

  const handleChangeFilter = (key: string, value: string) => {
    const _params = new URLSearchParams(searchParams.toString());

    if (value || value !== 'todos') {
      _params.set(`filter[${key}]`, value);
    } else {
      _params.delete(`filter[${key}]`);
    }
    _params.set('page', '1');
    setParams(_params.toString());
  };

  const handleSearch = useDebouncedCallback(() => {
    router.push(`?${params}`);
  }, 500);

  return (
    <div className="flex flex-col bg-white shadow-sm rounded border h-full max-h-full overflow-hidden p-2">
      <div className="flex  w-full">
        <div className="flex items-end gap-2">
          {FiltersComponent && (
            <FiltersComponent
              onChangeFilter={handleChangeFilter}
              searchParams={searchParams}
            />
          )}
          <ButtonDefault
            className="px-3 h-10 bg-blue-500 rounded text-white py-1 hover:bg-sky-700"
            onClick={handleSearch}
          >
            Buscar
          </ButtonDefault>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-2">
            {onAdd && (
              <ButtonDefault
                className="flex items-center absolute right-10 gap-2 bg-green-700 text-white px-3 py-2 rounded hover:bg-green-900"
                onClick={onAdd}
              >
                <span>+</span> Adicionar
              </ButtonDefault>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white shadow-sm rounded border mt-10 h-full overflow-auto">
        {tableComponent(data ?? [], isPending)}
      </div>

      {meta && (
        <div className="border-t p-4">
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            limit={meta.limit}
          />
        </div>
      )}
    </div>
  );
}
