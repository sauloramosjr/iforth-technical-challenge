'use client';

import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { ListPageWrapper } from '@/components/listPageWrapper';
import { useNotification } from '@/components/notifications/provider';
import ProductFilters from '@/features/product/components/productFilters';
import ProductTable from '@/features/product/components/productTable';
import produtoService from '@/features/product/services/produtoService';
import {
  TProduct,
  TProductWithreatedBy,
} from '@/features/product/types/TProduct';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import { Suspense, useState } from 'react';

const ProductsPage = () => {
  const router = useRouter();
  const { notify } = useNotification();
  const [dataChanged, setDataChanged] = useState<TProduct>();
  const [sortedColumn, setSortedColumn] = useState<{
    key: string;
    direction: 'asc' | 'desc' | '';
  }>({
    key: 'createdAt',
    direction: 'desc',
  });
  const fetchProducts = async ({
    page,
    limit,
    filters,
    select,
    sort,
  }: {
    page: string;
    limit: string;
    filters: Record<string, string>;
    select?: (keyof TProductWithreatedBy)[];
    sort?: string;
  }) => {
    try {
      return await produtoService.getAll({
        page,
        limit,
        filters,
        select: select || [
          'id',
          'status',
          'name',
          'maxProduction',
          'minProduction',
        ],
        sort: `${sortedColumn.key}:${sortedColumn.direction}`,
      });
    } catch (error) {
      notify(getErrorMessage(error), 'error');
      return {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
      };
    }
  };

  const handleChangeStatus = useDebouncedCallback(
    async (id: string, status: TProduct['status']) => {
      try {
        const prod = await produtoService.changeStatus({ id, status });
        setDataChanged(prod);
        notify(`Produto: ${prod.name} foi alterado com sucesso`, 'success');
      } catch (error) {
        notify(getErrorMessage(error), 'error');
      }
    },
    500
  );

  const handleSortChange = (key: string, direction: 'asc' | 'desc' | '') => {
    setSortedColumn({ key, direction });
  };

  return (
    <Suspense>
      <ListPageWrapper
        sort={`${sortedColumn.key}:${sortedColumn.direction}`}
        dataChanged={dataChanged}
        fetchData={fetchProducts}
        FiltersComponent={({ onChangeFilter, searchParams }) => (
          <ProductFilters
            searchParams={searchParams}
            onChangeFilter={onChangeFilter}
          />
        )}
        tableComponent={(data, isPending) => (
          <ProductTable
            isPending={isPending}
            products={data}
            handleChangeStatus={handleChangeStatus}
            onSortChange={handleSortChange}
          />
        )}
        onAdd={() => router.push('/dashboard/cadastros/produto/adicionar')}
      />
    </Suspense>
  );
};

export default ProductsPage;
