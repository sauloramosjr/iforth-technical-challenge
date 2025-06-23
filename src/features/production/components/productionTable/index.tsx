'use client';
import ButtonDefault from '@/components/buttonDefault';
import { DataTable } from '@/components/tableDefault';
import React, { useState } from 'react';
import { columns } from './columns';
import { TProduction, TProductionWithProduct } from '../../types/TProduction';
import DialogDefault from '@/components/confirmDialog';

const ProductionTable = ({
  productions,
  isPending,
  handleChangeStatus,
  onSortChange,
}: {
  productions: TProductionWithProduct[] | null;
  isPending: boolean;
  handleChangeStatus: (id: string, status: TProduction['status']) => void;
  onSortChange?: (key: string, direction: 'asc' | 'desc' | '') => void;
}) => {
  const [productionSelected, setProductionSelected] =
    useState<TProductionWithProduct>();

  const openModal = (production: TProductionWithProduct) => {
    setProductionSelected(production);
  };

  return (
    <>
      <DataTable<TProductionWithProduct>
        columns={columns}
        data={productions}
        isLoading={isPending}
        onSortChange={onSortChange}
        actionsDropdown={(item, index, closeMenu) => (
          <>
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
            {item.justification && (
              <ButtonDefault
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  openModal(item);
                  closeMenu();
                }}
              >
                Visualizar Justificativa
              </ButtonDefault>
            )}
          </>
        )}
      />
      <DialogDefault
        onConfirm={() => setProductionSelected(undefined)}
        message=""
        open={!!productionSelected}
      >
        <h2>Justificativa</h2>
        <p>{productionSelected?.justification}</p>
      </DialogDefault>
    </>
  );
};

export default ProductionTable;
