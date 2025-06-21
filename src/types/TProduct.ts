import { Product } from '@/lib/orm/generated';

type TProduct = Product;

export type TProductCreate = Pick<TProduct, 'name'> &
  Pick<TProduct, 'minProduction'> &
  Pick<TProduct, 'maxProduction'>;
