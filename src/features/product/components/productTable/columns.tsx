import ButtonDefault from '@/components/ButtonDefault';
import { Product } from '@/lib/orm/generated';
import { StatusEnum } from '../../enums/status';

export const columns = [
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
    className: 'col-situacao',
    render: (item: Product) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          item.status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {StatusEnum[item.status]}
      </span>
    ),
  },
  { title: 'PRODUTO', key: 'name', className: 'col-PRODUTO' },
  {
    title: 'PRODUÇÃO MIN.',
    key: 'minProduction',
    className: 'text-end col-prod-min',
    render: (item: Product) => (
      <span className="inline-block border border-red-400 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
        {item.minProduction} m²
      </span>
    ),
  },
  {
    title: 'PRODUÇÃO MAX.',
    key: 'maxProduction',
    className: 'text-end col-prod-max',
    render: (item: Product) => (
      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
        {item.maxProduction} m²
      </span>
    ),
  },
];
