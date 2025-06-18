'use client';

import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { createProduct } from '@/features/product/services/produtoService';
import TCreateProduto from '../types/TCreateProduct';

export function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateProduto>();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: TCreateProduto) => {
    startTransition(async () => {
      await createProduct(data);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nome</label>
        <input
          {...register('name', { required: 'O nome é obrigatório' })}
          className="border px-3 py-2 w-full rounded"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label>Produção Mínima</label>
        <input
          type="number"
          {...register('minProduction', { required: 'Obrigatório' })}
          className="border px-3 py-2 w-full rounded"
        />
        {errors.minProduction && (
          <span className="text-red-500">{errors.minProduction.message}</span>
        )}
      </div>

      <div>
        <label>Produção Máxima</label>
        <input
          type="number"
          {...register('maxProduction', { required: 'Obrigatório' })}
          className="border px-3 py-2 w-full rounded"
        />
        {errors.maxProduction && (
          <span className="text-red-500">{errors.maxProduction.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isPending ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}
