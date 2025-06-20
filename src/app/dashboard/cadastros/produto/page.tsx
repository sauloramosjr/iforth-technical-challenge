'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { useNotification } from '@/components/notifications/provider';
import ProductTable from '@/features/product/components/productTable';
import produtoService from '@/features/product/services/produtoService';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import { Product } from '@/lib/orm/generated';
import { THttpResponsePaginated } from '@/types/THttpResponsePaginated';
import Pagination from '@/components/pagination';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const { notify } = useNotification();

  const [products, setProducts] = useState<Product[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [meta, setMeta] = useState<
    THttpResponsePaginated<Product[]>['meta'] | null
  >(null);

  const fetchProducts = async () => {
    const page = searchParams.get('page') || '';
    const limit = searchParams.get('limit') || '';

    try {
      const result = await produtoService.getAll({ page, limit });
      setProducts(result.data);
      setMeta(result.meta);
      console.log(result.meta);
    } catch (err) {
      notify(getErrorMessage(err), 'error');
    }
  };

  useEffect(() => {
    startTransition(fetchProducts);
  }, [searchParams]);

  return (
    <div className="flex flex-col bg-white shadow-sm rounded border h-fit">
      <ProductTable isPending={isPending} products={products} />
      {meta && (
        <div className="border-t p-4">
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            limit={meta.limit}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
