'use client';
import ProductionEntriesChart from '@/features/production/components/productionCharts';
import productionService from '@/features/production/services/productionService';
import { TProductionWithProduct } from '@/features/production/types/TProduction';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [productions, setProductions] = useState<TProductionWithProduct[]>([]);
  const getProductions = async () => {
    const res = await productionService.getAll({ page: '', limit: '99999',select:['id','product','quantityProduced','createdAt','createdBy','status'] });
    setProductions(res.data);
  };
  useEffect(() => {
    getProductions();
  }, []);

  return (
    <div className='p-5'>
      <ProductionEntriesChart entries={productions}></ProductionEntriesChart>
    </div>
  );
};

export default Dashboard;
