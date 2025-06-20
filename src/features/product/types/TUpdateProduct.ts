import { Product } from '@/lib/orm/generated';
import TCreateProduct from './TCreateProduct';

type TUpdateProduct = Partial<TCreateProduct>&
  Partial<Pick<Product, 'status'>>;

export default TUpdateProduct;
