import { Product } from '@/lib/prisma/generated';

type TUpdateProductFlag = Pick<Product, 'id'> & Pick<Product, 'status'>;

export default TUpdateProductFlag;
