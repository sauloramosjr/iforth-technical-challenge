import { Product } from '@/lib/orm/generated';

type TUpdateProductFlag = Pick<Product, 'id'> & Pick<Product, 'status'>;

export default TUpdateProductFlag;
