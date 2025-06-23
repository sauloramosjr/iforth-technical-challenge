import ButtonDefault from '@/components/buttonDefault';
import { DataTable } from '@/components/tableDefault';
import React from 'react';
import { columns } from './columns';
import { Product } from '@/lib/orm/generated';
import { TProduct } from '../../types/TProduct';

const ProductTable = ({
  products,
  isPending,
  handleChangeStatus,
  onSortChange
}: {
  products: Product[] | null;
  isPending: boolean;
  handleChangeStatus: (id: string, status: TProduct['status']) => void;
    onSortChange?: (key: string, direction: 'asc' | 'desc' | '') => void;  
}) => {
  return (
    <DataTable
      columns={columns}
      data={products}
      isLoading={isPending}
      onSortChange={onSortChange}
      actionsDropdown={(item, index, closeMenu) => (
        <ButtonDefault
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => {
            handleChangeStatus(
              item.id,
              item.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
            );
            closeMenu();
          }}
        >
          Alterar situação
        </ButtonDefault>
      )}
    />
  );
};

export default ProductTable;
