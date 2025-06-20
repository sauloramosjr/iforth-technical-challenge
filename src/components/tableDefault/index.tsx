'use client';

import { Portal } from '@/components/portal';
import React, { useEffect, useState } from 'react';
import './styles.css';

export type TColumn<T> = {
  title: string;
  key: keyof T | string;
  className?: string;
  render?: (
    item: T,
    index: number,
    openActions: (e: React.MouseEvent) => void
  ) => React.ReactNode;
};

type TDataTableProps<T> = {
  columns: TColumn<T>[];
  data: T[] | null;
  isLoading?: boolean;
  emptyMessage?: string;
  actionsDropdown?: (
    item: T,
    index: number,
    closeMenu: () => void
  ) => React.ReactNode;
};

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  actionsDropdown,
}: TDataTableProps<T>) {
  const [actionsOpenIndex, setActionsOpenIndex] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('#menu-actions')
      ) {
        closeMenu();
      }
    };

    if (actionsOpenIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionsOpenIndex, anchorEl]);

  const openMenu = (index: number, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setActionsOpenIndex(index);
    setMenuPosition({
      x: rect.left,
      y: rect.bottom + 4,
    });
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const closeMenu = () => {
    setActionsOpenIndex(null);
    setMenuPosition(null);
    setAnchorEl(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-separate border-spacing-0">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={col.title}
                className={`px-4 py-3 text-left text-xs font-bold text-gray-600 whitespace-nowrap ${
                  col.className || ''
                }`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y w-full overflow-y-auto">
          {isLoading ? (
            <tr className=" w-full">
              <td colSpan={columns.length} className="p-5 md:text-center">
                Carregando...
              </td>
            </tr>
          ) : data && data.length === 0 ? (
            <tr className=" w-full">
              <td colSpan={columns.length} className="p-5 text-center">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr key={item.id} className=" w-full hover:bg-gray-200">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 whitespace-nowrap text-xs ${
                      col.className || ''
                    }`}
                  >
                    {col.render
                      ? col.render(item, index, (e) => openMenu(index, e))
                      : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {actionsOpenIndex !== null && menuPosition && actionsDropdown && (
        <Portal>
          <div
            id="menu-actions"
            className="absolute z-50 bg-white border rounded shadow-md p-1"
            style={{
              position: 'fixed',
              top: menuPosition.y,
              left: menuPosition.x,
            }}
          >
            {actionsDropdown(
              data![actionsOpenIndex],
              actionsOpenIndex,
              closeMenu
            )}
          </div>
        </Portal>
      )}
    </div>
  );
}
