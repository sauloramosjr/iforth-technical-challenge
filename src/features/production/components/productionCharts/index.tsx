'use client';

import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TProductionWithProduct } from '../../types/TProduction';

type Props = {
  entries: TProductionWithProduct[];
};

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#375a53',
  '#504733',
  '#FF69B4',
  '#00BFFF',
  '#32CD32',
  '#FF4500',
];

const ProductionEntriesChart = ({ entries }: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [groupedByProduct, setGroupedByProduct] = useState<
    Record<string, any[]>
  >({});

  useEffect(() => {
    const transformed = entries.map((entry) => {
      const outOfRange =
        entry.quantityProduced < entry.product.minProduction ||
        entry.quantityProduced > entry.product.maxProduction;

      return {
        id: entry.id,
        productName: entry.product.name,
        date: new Date(entry.createdAt).toLocaleDateString(),
        quantity: entry.quantityProduced,
        outOfRange,
        createdBy: entry.createdBy?.name ?? 'Desconhecido',
      };
    });

    const grouped = transformed.reduce<Record<string, any[]>>((acc, entry) => {
      if (!acc[entry.productName]) acc[entry.productName] = [];
      acc[entry.productName].push(entry);
      return acc;
    }, {});

    setData(transformed);
    setGroupedByProduct(grouped);
  }, [entries]);

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow text-sm">
          <p>
            <strong>Produto:</strong> {entry.productName}
          </p>
          <p>
            <strong>Quantidade:</strong> {entry.quantity}
          </p>
          <p>
            <strong>Data:</strong> {entry.date}
          </p>
          <p>
            <strong>Criado por:</strong> {entry.createdBy}
          </p>
          {entry.outOfRange && (
            <p className="text-red-500 font-semibold">⚠️ Fora do Range!</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Produções por Produto</h2>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="date" name="Data" />
          <YAxis dataKey="quantity" name="Quantidade Produzida" />
          <Tooltip content={renderCustomTooltip} />
          <Legend />

          {Object.entries(groupedByProduct).map(
            ([productName, entries], index) => (
              <Scatter
                key={productName}
                name={productName}
                data={entries}
                fill={COLORS[index % COLORS.length]}
                shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  const color = COLORS[index % COLORS.length];
                  return <circle cx={cx} cy={cy} r={6} fill={color} />;
                }}
              />
            )
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionEntriesChart;
