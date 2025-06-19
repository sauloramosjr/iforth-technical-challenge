import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TMenuItem } from '@/lib/constants/menuList';

// import { Container } from './styles';

const MenuItems = ({items,handleClick}:{items:TMenuItem[],handleClick?: ()=>void}) => {
  return     <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition"
                      onClick={handleClick}
                    >
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={16}
                          height={16}
                        />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
};

export default MenuItems;
