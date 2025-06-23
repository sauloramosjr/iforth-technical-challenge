'use client';

import SelectDefault from '@/components/selectDefault';
import { TProduct } from '@/features/product/types/TProduct';
import { useState } from 'react';

export type ProductFiltersProps = {
  searchParams: URLSearchParams;
  onChangeFilter: (key: string, value: string) => void;
  products: TProduct[];
};

const ProductionFilters = ({
  searchParams,
  onChangeFilter,
  products,
}: ProductFiltersProps) => {
  const [product, setProduct] = useState(
    searchParams.get('filter[product]') || ''
  );
  const [status, setStatus] = useState(
    searchParams.get('filter[status]') || 'ATIVE'
  );
  return (
    <div>
      <h4>Filtros</h4>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Produto</label>
          <SelectDefault
            options={[
              ...products?.map((e) => ({ label: e.name, value: e.id })),
            ]}
            onChange={(e: string) => {
              setProduct(e);
              onChangeFilter('product', e);
            }}
            value={product}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Situação</label>
          <SelectDefault
            value={status}
            onChange={(e: string) => {
              setStatus(e);
              onChangeFilter('status', e);
            }}
            options={[
           
              {
                value: 'ACTIVE',
                label: 'Ativo',
              },
              {
                value: 'INACTIVE',
                label: 'Inativo',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductionFilters;
