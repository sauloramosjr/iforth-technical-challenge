'use client';

import { ListPageWrapper } from '@/components/listPageWrapper';
import { useNotification } from '@/components/notifications/provider';
import ProductionFilters from '@/features/production/components/productionFilters';
import ProductionTable from '@/features/production/components/productionTable';
import { useProduction } from '@/features/production/providers';
import productionService from '@/features/production/services/productionService';
import {
  TProduction,
  TProductionWithProduct,
} from '@/features/production/types/TProduction';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Producao = () => {
  const router = useRouter();
  const { notify } = useNotification();
  const [dataChanged, setDataChanged] = useState<TProductionWithProduct>();
  const { products } = useProduction();
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
    select?: (keyof TProductionWithProduct)[];
    sort?: string;
  }) => {
    try {
      const [response] = await Promise.all([
        productionService.getAll({
          page,
          limit,
          filters,
          select:
            select ||
            ([
              'id',
              'quantityProduced',
              'status',
              'justification',
              'product.name',
              'product.maxProduction',
              'product.minProduction',
            ] as (keyof TProductionWithProduct)[]),
          sort: sort || `${sortedColumn.key}:${sortedColumn.direction}`,
        }),
      ]);

      return response;
    } catch (error) {
      notify(getErrorMessage(error), 'error');
      return {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
      };
    }
  };

  const handleChangeStatus = useDebouncedCallback(
    async (id: string, status: TProduction['status']) => {
      try {
        const prod = await productionService.changeStatus({ id, status });
        setDataChanged(prod);
        notify(`Status de produção foi alterado com sucesso`, 'success');
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
      <ListPageWrapper<TProductionWithProduct>
        sort={`${sortedColumn.key}:${sortedColumn.direction}`}
        dataChanged={dataChanged}
        fetchData={fetchProducts}
        FiltersComponent={({ onChangeFilter, searchParams }) => (
          <ProductionFilters
            products={products}
            onChangeFilter={onChangeFilter}
            searchParams={searchParams}
          />
        )}
        tableComponent={(data, isPending) => (
          <ProductionTable
            isPending={isPending}
            productions={data}
            handleChangeStatus={handleChangeStatus}
            onSortChange={handleSortChange}
          />
        )}
        onAdd={() => router.push('/dashboard/apontamentos/producao/adicionar')}
      />
    </Suspense>
  );
};

export default Producao;
