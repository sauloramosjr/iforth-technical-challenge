'use client';

import { Portal } from '@/components/portal';
import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Image from 'next/image';

export type TColumn<T> = {
  title: string;
  key: keyof T | 'actions';
  className?: string;
  sortable?: boolean; // ✅ Novo: indica se a coluna é ordenável
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
  onSortChange?: (key: string, direction: 'asc' | 'desc' | '') => void; // ✅ Novo: callback pro pai saber
};

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  actionsDropdown,
  onSortChange,
}: TDataTableProps<T>) {
  const [actionsOpenIndex, setActionsOpenIndex] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>(
    'asc'
  );

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

  const handleSort = (key: string) => {
    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      newDirection = 'desc';
    }
    if (sortDirection === 'desc' && key == sortKey) {
      setSortKey('');
      setSortDirection('');
      if (onSortChange) {
        onSortChange('createdAt', 'desc');
      }
      router.push(path);
      return;
    }
    setSortKey(key);
    setSortDirection(newDirection);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', `${key}:${newDirection}`);

    if (onSortChange) {
      onSortChange(key, newDirection);
    }
    router.push(`${path}?` + newParams);
  };

  const navigateToChield = (id: string) => {
    router.push(path + '/' + id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto h-auto w-full border-separate border-spacing-0">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap"></th>
            {columns.map((col) => (
              <th
                key={col.title}
                className={`px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap   ${
                  col.className || ''
                } ${col.sortable && ' cursor-pointer hover:bg-sky-200 '} ${
                  col.sortable && sortKey === col.key && 'bg-sky-200'
                }`}
                onClick={() => col.sortable && handleSort(col.key.toString())}
              >
                {col.title}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y w-full h-auto overflow-y-auto">
          {isLoading ? (
            <tr className="w-full">
              <td colSpan={columns.length} className="p-5 text-center">
                Carregando...
              </td>
            </tr>
          ) : data && data.length === 0 ? (
            <tr className="w-full">
              <td colSpan={columns.length} className="p-5 text-center">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr key={item.id} className="w-full">
                <td
                  onClick={() => navigateToChield((item as any).id)}
                  className="flex justify-center items-center h-full py-4 cursor-pointer "
                >
                  <Image
                    src={'/search.svg'}
                    alt="search"
                    width={20}
                    height={10}
                  />
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 whitespace-nowrap text-xs ${
                      col.className || ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
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
