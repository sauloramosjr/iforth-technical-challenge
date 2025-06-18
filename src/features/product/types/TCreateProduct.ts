import { Product } from '@/lib/prisma/generated';

type TCreateProduct = Pick<Product, 'name'> &
  Pick<Product, 'maxProduction'> &
  Pick<Product, 'minProduction'>;

export default TCreateProduct;
