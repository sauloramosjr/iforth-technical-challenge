'use client'
import { TProduct } from '@/features/product/types/TProduct';
import { createContext, useContext, useEffect, useState } from 'react';
import produtoService from '@/features/product/services/produtoService';

export type TProductionProvider = {
  products: TProduct[];
  setProducts: (products: TProduct[]) => void;
};

const ProductionContext = createContext<TProductionProvider | null>(null);

export const ProductionProvider = ({ children }: React.PropsWithChildren) => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const getAllProducts = async () => {
    if (!products.length) {
      const res = await produtoService.getAll({ page: '1', limit: '999' });
      setProducts(res.data);
    }
  };
  useEffect(() => {
    if (!products.length) {
      getAllProducts();
    }
  }, []);

  return (
    <ProductionContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductionContext.Provider>
  );
};

export const useProduction = () => {
  const context = useContext(ProductionContext);
  if (!context) {
    throw new Error(
      'useProduction deve ser usado dentro de um ProductionProvider'
    );
  }
  return context;
};
