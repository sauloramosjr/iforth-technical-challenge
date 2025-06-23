import Breadcrumbs from '@/components/breadCrumbs';
import SidebarMenu from '@/components/sidebarMenu';
import React from 'react';

const LayoutDashboard = ({ children }: React.PropsWithChildren) => {
  return (
<section className="flex max-h-screen w-full h-screen overflow-hidden">
  <SidebarMenu />
  
  <div className="flex flex-col flex-1 p-4 md:mt-1 max-w-screen overflow-hidden h-screen">
    <Breadcrumbs />

    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
</section>
  );
};

export default LayoutDashboard;
