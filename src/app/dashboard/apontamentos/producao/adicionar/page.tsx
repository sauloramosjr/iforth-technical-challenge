'use client';
import { useProduction } from '@/features/production/providers';
import React from 'react';
import { ProductionForm } from '@/features/production/components/productionForm';

const AdicionarProducao = () => {
  return (
    <div>
      <h2 className="text-lg">Adicionar Produto</h2>
      <ProductionForm />
    </div>
  );
};

export default AdicionarProducao;
