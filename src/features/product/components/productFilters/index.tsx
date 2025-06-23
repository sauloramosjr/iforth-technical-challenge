'use client';

import InputDefault from '@/components/inputDefault';
import SelectDefault from '@/components/selectDefault';
import { useEffect, useState } from 'react';

export type ProductFiltersProps = {
  searchParams: URLSearchParams;
  onChangeFilter: (key: string, value: string) => void;
};

const ProductFilters = ({
  searchParams,
  onChangeFilter,
}: ProductFiltersProps) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setName(searchParams.get('filter[name]') || '');
    setStatus(searchParams.get('filter[status]') || '');
  }, [searchParams]);

  return (
    <div>
      <h4>Filtros</h4>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Nome</label>
          <InputDefault
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              onChangeFilter('name', e.target.value);
            }}
            placeholder="Pesquisar por nome"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Situação</label>
          <SelectDefault
            value={status}
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
            onChange={(e: string) => {
              setStatus(e);
              onChangeFilter('status', e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
