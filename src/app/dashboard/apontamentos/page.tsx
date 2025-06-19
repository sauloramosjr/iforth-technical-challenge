import MenuItems from '@/components/sidebarMenu/menuItems';
import { menuList } from '@/lib/constants/menuList';
import React from 'react';


const Apontamentos = () => {
  const items = menuList.find((e) => e.name == 'Apontamentos')!.items;
  return (
    <div className="p-5 ">
      <MenuItems items={items} />
    </div>
  );
};

export default Apontamentos;
