'use client';

import ButtonDefault from '@/components/buttonDefault';
import httpClient from '@/lib/httpClient';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { URLSearchParams } from 'url';

type TApontamento = {
  id: string;
  situacao: 'ATIVO' | 'INATIVO';
  produto: string;
  producao: string;
};

const apontamentosMock: TApontamento[] = [
  { id: '01', situacao: 'ATIVO', produto: 'Produto X', producao: '600 m²' },
  { id: '02', situacao: 'ATIVO', produto: 'Produto Y', producao: '300 m²' },
];

const Page = () => {
  const [actionsOpenIndex, setActionsOpenIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const params = searchParams.get('page');
  console.log(params);
  httpClient
    .get('/api/registers/products', {
      withCredentials: true,
    })
    .then((e) => {
      console.log(e.data);
    });
  const toggleActions = (index: number) => {
    setActionsOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="overflow-x-auto p-10 h-auto w-inherith  -xl shadow-sm bg-white">
      <div className="min-w-[530px] border rounded ">
        <table className="w-full min-w-[530px] table-auto min-h">
          <thead className=" bg-gray-100 ">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                AÇÕES
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                SITUAÇÃO
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                PRODUTO
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                PRODUÇÃO MIN.
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">
                PRODUÇÃO MAX.
              </th>
            </tr>
          </thead>
          <tbody>
            {apontamentosMock.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">{item.id}</td>

                <td className="relative px-4 py-3 whitespace-nowrap">
                  <button
                    aria-label="Ações"
                    className="border rounded-lg p-1 w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    onClick={() => toggleActions(index)}
                  >
                    <span className="text-lg">⋮</span>
                  </button>

                  {actionsOpenIndex === index && (
                    <div className="absolute top-full left-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50 p-1">
                      <ButtonDefault
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => alert('Alterar situação')}
                      >
                        Alterar situação
                      </ButtonDefault>
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.situacao === 'ATIVO'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.situacao}
                  </span>
                </td>

                <td className="px-4 py-3">{item.produto}</td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {index === 1 ? (
                    <span className="inline-block border border-red-400 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                      {item.producao}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {item.producao}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
