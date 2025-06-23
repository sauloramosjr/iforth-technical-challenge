import crudServiceFactory from '@/lib/factorys/crudServiceFactory';
import TUpdateProductFlag, { TProduct, TProductCreate, TProductUpdate, TProductWithreatedBy, } from '../types/TProduct';

const productService = crudServiceFactory<TProductWithreatedBy, TProductCreate, TProductUpdate, TUpdateProductFlag>(
  '/api/registers/products'
);

export default productService;
