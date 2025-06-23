import ButtonDefault from '@/components/buttonDefault';
import { Product } from '@/lib/orm/generated';
import { TColumn } from '@/components/tableDefault';
import { TProduction, TProductionWithProduct } from '../../types/TProduction';
import { StatusEnum } from '@/enums/status';

export const columns: TColumn<TProductionWithProduct>[] = [
  {
    title: 'ID',
    key: 'id',
    className: 'col-id',

    sortable: true,
  },
  {
    title: 'AÇÕES',
    key: 'actions',
    className: 'relative col-acoes',
    render: (
      _item: TProduction,
      index: number,
      openActions: (e: React.MouseEvent) => void
    ) => (
      <ButtonDefault
        aria-label="Ações"
        className="border rounded-lg p-1 w-8 h-8 flex items-center justify-center hover:bg-gray-100 items-center flex"
        onClick={openActions}
      >
        <span className="text-lg h-8">...</span>
      </ButtonDefault>
    ),
  },
  {
    title: 'SITUAÇÃO',
    key: 'status',
    className: 'col-situacao text-center',
    render: (item: TProduction) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full  text-xs font-medium ${
          item.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : ''
        }`}
      >
        {StatusEnum[item.status]}
      </span>
    ),
    sortable: true,
  },
  {
    title: 'PRODUTO',
    key: 'productId',
    className: 'col-PRODUTO text-center',
    render: (item: TProductionWithProduct) => (
      <span className="px-3 py-1  font-bold">{item.product.name}</span>
    ),
    sortable: true,
  },
  {
    title: 'PRODUÇÃO',
    key: 'quantityProduced',
    className: 'text-end col-prod-default',
    render: (item: TProductionWithProduct) => (
      <span
        className={`px-3 py-1  font-bold ${
          item.quantityProduced < item.product.minProduction ||
          item.quantityProduced > item.product.maxProduction
            ? 'border rounded border-red-500 '
            : ''
        }`}
      >
        {item.quantityProduced}m²
        {(item.quantityProduced < item.product.minProduction ||
          item.quantityProduced > item.product.maxProduction) && (
            <span className="ml-1">
              {item.quantityProduced > item.product.maxProduction ? '▲' : '▼'}
            </span>
          )}
      </span>
    ),
    sortable: true,
  },
];
