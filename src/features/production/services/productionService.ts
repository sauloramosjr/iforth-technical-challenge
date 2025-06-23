import crudServiceFactory from '@/lib/factorys/crudServiceFactory';
import TUpdateProductionFlag, {
  TProductionCreate,
  TProductionUpdate,
  TProductionWithProduct
} from '../types/TProduction';

const productionService = crudServiceFactory<TProductionWithProduct, TProductionCreate, TProductionUpdate, TUpdateProductionFlag>(
  '/api/records/productions'
);
export default productionService;
