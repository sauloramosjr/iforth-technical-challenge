import Breadcrumbs from '@/components/breadCrumbs';
import SidebarMenu from '@/components/sidebarMenu';
import React from 'react';

const LayoutDashboard = ({ children }: React.PropsWithChildren) => {
  return (
    <section className='flex min-h-screen w-full '>
      <SidebarMenu />
      <div  className='p-4 md:mt-1 flex-1 max-w-screen'>
        <Breadcrumbs />
      {children}
      </div>
    </section>
  );
};

export default LayoutDashboard;
