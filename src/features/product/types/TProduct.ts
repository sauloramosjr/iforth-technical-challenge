import { Product } from '@/lib/orm/generated';

export type TProduct = Product;

export type TProductCreate = Pick<TProduct, 'name'> &
  Pick<TProduct, 'minProduction'> &
  Pick<TProduct, 'maxProduction'>;

export type TProductUpdate = Partial<TProductCreate>;

type TUpdateProductFlag = Pick<TProduct, 'id'> & Pick<TProduct, 'status'> ;

export default TUpdateProductFlag;

type aux = Omit<TProduct,'createdBy'>
type aux2 = Omit<TProduct,'updatedBy'>

export type TProductWithreatedBy= aux2
& {createdBy:{name:string,id:string},updatedBy:{name:string,id:string}}