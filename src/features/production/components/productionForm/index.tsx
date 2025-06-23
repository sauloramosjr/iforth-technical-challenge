'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';

import FormDefault from '@/components/formDefault';
import DialogDefault from '@/components/confirmDialog';
import { useNotification } from '@/components/notifications/provider';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import produtoService from '../../services/productionService';
import { TProductionCreate } from '../../types/TProduction';
import { useProduction } from '../../providers';

export function ProductionForm() {
  const router = useRouter();
  const { notify } = useNotification();
  const { products } = useProduction();
  const [showJustifyDialog, setShowJustifyDialog] = useState(false);
  const [confirmOutRange, setConfirmOutRange] = useState('');
  const [formData, setFormData] = useState<TProductionCreate | null>(null);
  const [justificationInput, setJustificationInput] = useState('');

  const handleFormSubmit = useDebouncedCallback((data: TProductionCreate) => {
    const product = products.find((p) => p.id === data.productId);

    if (!product) {
      notify('Produto não encontrado', 'error');
      return;
    }

    const isBelowMin = data.quantityProduced < product.minProduction;
    const isAboveMax = data.quantityProduced > product.maxProduction;
    const requiresJustification = isBelowMin || isAboveMax;

    setFormData(data);
    if (requiresJustification && !data.justification) {
      
      // Se precisa de justificativa mas não veio nenhuma
      setConfirmOutRange(isBelowMin?'Seu apontamento está abaixo do padrão do produto!':'Seu apontamento está acima do padrão do produto!')
      // 
    } else {
      // Se está dentro dos limites ou já tem justificativa, segue para confirmação
      handleConfirm(data)
      setFormData(data);
    }
  }, 300);

  const confirmIsOutRange = ()=>{
    setConfirmOutRange('')
    setShowJustifyDialog(true);
  }

  const handleCancel = () => {
    setShowJustifyDialog(false);
    setFormData(null);
    setJustificationInput('');
  };

  const handleConfirm = async (data?:TProductionCreate) => {
   const updatedData = formData?{...formData,
      justification: justificationInput,

   }:data ?{
      ...data,
      justification: justificationInput,
    }:undefined
    if(!updatedData){
      return
    }
    try {
      await produtoService.create(updatedData);
      notify('Produto criado com sucesso!', 'success');
      setTimeout(() => {
        router.push('/dashboard/apontamentos/producao');
      }, 1000);
    } catch (error) {
      notify(getErrorMessage(error), 'error');
    } finally {
      handleCancel();
    }
  };


  return (
    <>
      <FormDefault<TProductionCreate>
        submitText="Salvar"
        onSubmit={handleFormSubmit}
        fields={[
          {
            name: 'productId',
            label: 'Produto:',
            className: ' flex-1 h-full ',
            type: 'select',
            validation: { required: 'O produto é obrigatório' },
            options: products
              .filter((e) => e.status === 'ACTIVE')
              .map((curr) => ({
                value: curr.id,
                label: curr.name,
              })),
          },
          {
            name: 'quantityProduced',
            label: 'Produção',
            type: 'number',
            className: '  max-w-40  ',
            validation: {
              required: 'Produção é obrigatória',
              min: { value: 0, message: 'Não pode ser negativo' },
              valueAsNumber: true,
            },
          },
        ]}
      />

      
      <DialogDefault
      message={confirmOutRange + ' Tem certeza que deseja prosseguir?'}
        open={!!confirmOutRange}
        onCancel={()=>setConfirmOutRange('')}
        onConfirm={confirmIsOutRange}
      />
      
      <DialogDefault
      message=''
        open={showJustifyDialog}
        // onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">Justificativa obrigatória</h2>
          <p>
            A quantidade de produção está fora dos limites permitidos. Por favor, informe uma justificativa:
          </p>
          <textarea
            value={justificationInput}
            onChange={(e) => setJustificationInput(e.target.value)}
            className="border rounded p-2 w-full min-h-[80px]"
            placeholder="Digite sua justificativa..."
          />
          {justificationInput.trim() === '' && (
            <p className="text-red-500 text-sm">Justificativa é obrigatória.</p>
          )}
        </div>
      </DialogDefault>


    </>
  );
}
