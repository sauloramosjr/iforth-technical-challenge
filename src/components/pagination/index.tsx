'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type PaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
};

const Pagination = ({ page, totalPages, limit }:PaginationProps) => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const generatePageLink = (targetPage: number) => {
    currentParams.set('page', targetPage.toString());
    currentParams.set('limit', limit.toString());
    return `?${currentParams.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center space-x-1">
      <Link
        href={generatePageLink(Math.max(page - 1, 1))}
        className={`px-3 py-1 rounded border text-sm
          ${
            page === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
          }`}
      >
        Anterior
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={generatePageLink(p)}
          className={`
            px-3 py-1 rounded border text-sm
            ${p === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={generatePageLink(Math.min(page + 1, totalPages))}
        className={`
          px-3 py-1 rounded border text-sm
          ${
            page === totalPages
              ? 'pointer-events-none opacity-50'
              : 'hover:bg-gray-100'
          } `}
      >
        Próxima
      </Link>
    </nav>
  );
};

export default Pagination;
