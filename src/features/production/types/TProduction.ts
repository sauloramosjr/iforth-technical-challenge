import { TProduct } from '@/features/product/types/TProduct';
import { ProductionEntry } from '@/lib/orm/generated';

export type TProduction = ProductionEntry;

export type TProductionCreate = Pick<TProduction, 'productId'> &
  Pick<TProduction, 'quantityProduced'> &
  Partial<Pick<TProduction, 'justification'>>& 
  Pick<TProduction, 'quantityProduced'> 

export type TProductionUpdate = Partial<TProductionCreate>;

type TUpdateProductionFlag = Pick<TProduction, 'id'> &
  Pick<TProduction, 'status'>;

export default TUpdateProductionFlag;

export type TProductionWithProduct = TProduction & {
  product: Pick<TProduct, 'name'> &
    Pick<TProduct, 'maxProduction'> &
    Pick<TProduct, 'minProduction'> 
}& {createdBy:{name:string,id:string},updatedBy:{name:string,id:string}}
