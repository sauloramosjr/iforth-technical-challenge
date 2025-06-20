import ButtonDefault from '@/components/ButtonDefault';
import { DataTable } from '@/components/tableDefault';
import React from 'react';
import { columns } from './columns';
import { Product } from '@/lib/orm/generated';

const ProductTable = ({
  products,
  isPending,
}: {
  products: Product[] | null;
  isPending: boolean;
}) => {
  return (
    <DataTable
      columns={columns}
      data={products}
      isLoading={isPending}
      actionsDropdown={(item, index, closeMenu) => (
        <>
          <ButtonDefault
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              alert(`Alterar situação do produto ${item.id}`);
              closeMenu();
            }}
          >
            Alterar situação
          </ButtonDefault>
          <ButtonDefault
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              alert(`Deletar produto ${item.id}`);
              closeMenu();
            }}
          >
            Deletar
          </ButtonDefault>
        </>
      )}
    />
  );
};

export default ProductTable;
