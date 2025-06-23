'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import DialogDefault from '@/components/confirmDialog'; // Aqui você importa o componente de confirmação
import FormDefault from '@/components/formDefault';
import { useNotification } from '@/components/notifications/provider';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import produtoService from '../../services/produtoService';
import { TProductCreate } from '../../types/TProduct';

export function ProductForm() {
  const router = useRouter();
  const { notify } = useNotification();
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<TProductCreate | null>(null);

  const handleFormSubmit = useDebouncedCallback((data: TProductCreate) => {
    setFormData(data);
    setShowConfirm(true);
  }, 300);

  const handleConfirm = async () => {
    if (!formData) return;

    try {
      await produtoService.create(formData);
      notify('Produto criado com sucesso!', 'success');
      setTimeout(() => {
        router.push('/dashboard/cadastros/produto');
      }, 1000);
    } catch (error) {
      notify(getErrorMessage(error), 'error');
    } finally {
      setShowConfirm(false);
      setFormData(null);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setFormData(null);
  };

  return (
    <>
      <FormDefault<TProductCreate>
        submitText="Salvar"
        onSubmit={handleFormSubmit}
        fields={[
          {
            name: 'name',
            label: 'Nome:',
            className: ' flex-1  ',
            type: 'text',
            validation: { required: 'O nome é obrigatório' },
          },
          {
            name: 'minProduction',
            label: 'Produção mínima:',
            type: 'number',
            className: ' flex-1 max-w-40 ',
            validation: {
              required: 'Produção mínima é obrigatória',
              min: { value: 0, message: 'Não pode ser negativo' },
              valueAsNumber: true,
            },
          },
          {
            name: 'maxProduction',
            label: 'Produção máxima:',
            type: 'number',
            className: ' flex-1 max-w-40 ',
            validation: {
              required: 'Produção máxima é obrigatória',
              min: { value: 0, message: 'Não pode ser negativo' },
              valueAsNumber: true,
            },
          },
        ]}
      />

      <DialogDefault
        open={showConfirm}
        message="Tem certeza que deseja salvar este produto?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
