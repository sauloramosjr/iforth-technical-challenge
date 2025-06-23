'use client'
import { ProductionProvider } from '@/features/production/providers';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <ProductionProvider> {children} </ProductionProvider>;
};

export default Layout;
