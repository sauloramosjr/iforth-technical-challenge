'use client';

import ButtonDefault from '@/components/buttonDefault';
import productService from '@/features/product/services/produtoService';
import { TProduct, TProductWithreatedBy } from '@/features/product/types/TProduct';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductView() {
  const path = usePathname();
  const router = useRouter();

  const [entry, setEntry] = useState<TProductWithreatedBy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntry = async () => {
    const pathSplited = path.split('/');
    try {
      const data = await productService.getOne(
        pathSplited[pathSplited.length - 1] + ''
      );
      setEntry(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEntry();
  }, [path]);

  if (loading) {
    return <div className="p-5">Carregando...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Erro: {error}</div>;
  }
  if (!entry) {
    return <div className="p-5">Nenhum registro encontrado.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes de Produto</h1>

      <div className="space-y-2">
        <div>
          <span className="font-semibold">Produto:</span>{' '}
          {entry?.name ?? '---'}
        </div>

        <div>
          <span className="font-semibold">Mínimo de produção:</span>{' '}
          {entry.minProduction}
        </div>
        <div>
          <span className="font-semibold">Máximo de produção:</span>{' '}
          {entry.maxProduction}
        </div>

        <div>
          <span className="font-semibold">Status:</span>{' '}
          <span
            className={`px-2 py-1 rounded text-xs ${
              entry.status === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {entry.status}
          </span>
        </div>

        <div>
          <span className="font-semibold">Criado em:</span>{' '}
          {new Date(entry.createdAt).toLocaleString()}
        </div>

        <div>
          <span className="font-semibold">Criado por:</span>{' '}
          {entry.createdBy?.name ?? '---'}
        </div>

        {entry.updatedAt && (
          <div>
            <span className="font-semibold">Atualizado em:</span>{' '}
            {new Date(entry.updatedAt).toLocaleString()}
          </div>
        )}

        {entry.updatedBy && (
          <div>
            <span className="font-semibold">Atualizado por:</span>{' '}
            {entry.updatedBy.name}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <ButtonDefault onClick={() => router.back()}>Voltar</ButtonDefault>
      </div>
    </div>
  );
}
