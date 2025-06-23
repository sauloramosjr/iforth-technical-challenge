import ButtonDefault from '@/components/buttonDefault';
import { TColumn } from '@/components/tableDefault';
import { StatusEnum } from '@/enums/status';
import { Product } from '@/lib/orm/generated';
import { TProduct } from '../../types/TProduct';

export const columns: TColumn<TProduct>[] = [
  { title: 'ID', key: 'id', className: 'col-id' },
  {
    title: 'AÇÕES',
    key: 'actions',
    className: 'relative col-acoes',
    render: (
      _item: Product,
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
    render: (item: Product) => (
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
    key: 'name',
    className: 'col-PRODUTO text-center',

    sortable: true,
  },
  {
    title: 'PADRÃO DE PRODUÇÃO',
    key: 'minProduction',
    className: 'text-end col-prod-default',
    render: (item: Product) => (
      <span className="px-3 py-1  font-bold">
        Mín.:
        <span className="text-green-700 mr-2 ml-1">{item.minProduction}m²</span>
        Máx.:
        <span className="text-blue-700 mr-2 ml-1">{item.maxProduction}m²</span>
      </span>
    ),
    sortable: true,
  },
];
