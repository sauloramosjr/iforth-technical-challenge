'use client';

import { menuList } from '@/lib/constants/menuList';
import { useState } from 'react';
import ButtonDefault from '../ButtonDefault';
import MenuItems from './menuItems';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão Hamburguer Mobile */}
      <div
        className={`md:hidden absolute p-4 z-50 ${
          isOpen ? 'left-50' : 'left-0'
        } ease-in-out duration-300`}
      >
        <ButtonDefault
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="flex flex-col gap-1"
        >
          {isOpen ? (
            // Ícone de "X"
            <div className="relative w-6 h-6">
              <span className="absolute top-1/2 right-1 w-6 h-0.5 bg-black rotate-45" />
              <span className="absolute top-1/2 right-1 w-6 h-0.5 bg-black -rotate-45" />
            </div>
          ) : (
            // Ícone Hamburguer
            <div className="flex flex-col gap-1">
              <span className="w-6 h-0.5 bg-black" />
              <span className="w-6 h-0.5 bg-black" />
              <span className="w-6 h-0.5 bg-black" />
            </div>
          )}
        </ButtonDefault>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full flex  flex-col justify-between w-64 bg-white border-r border-gray-200 p-4 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto md:min-w-60
        `}
      >
        <div className="flex flex-col gap-6">
          {menuList.map((group) => {
            return (
              <div key={group.name}>
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  {group.name}
                </h3>
                <ul className="space-y-2"></ul>
                <MenuItems items={group.items} handleClick={toggleMenu} />
              </div>
            );
          })}
        </div>
        <div>oi</div>
      </aside>

      {/* Overlay no mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default SidebarMenu;
