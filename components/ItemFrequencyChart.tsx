import React from 'react';
import type { FrequentItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ItemFrequencyChartProps {
  items: FrequentItem[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-lg border border-gray-700 shadow-xl">
        <p className="font-bold text-gray-200 mb-1">{label}</p>
        <p className="text-sm text-indigo-300">
          {`${payload[0].name}: `}
          <span className="font-semibold text-white">{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ItemFrequencyChart: React.FC<ItemFrequencyChartProps> = ({ items }) => {
  const sortedItems = [...items].sort((a, b) => a.count - b.count);

  return (
    <div className="w-full bg-black/50 border border-gray-800 shadow-lg rounded-xl p-6 h-96">
      <h3 className="text-xl font-semibold text-white mb-1">Top 10 Frequent Items</h3>
      <p className="text-sm text-gray-400 mb-6">Most commonly purchased individual items.</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart 
          data={sortedItems}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="item" type="category" stroke="#9ca3af" width={100} tick={{ fill: '#d1d5db' }}/>
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(129, 140, 248, 0.1)' }}
            wrapperStyle={{ outline: 'none' }}
          />
          <Bar dataKey="count" fill="#818cf8" name="Purchase Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemFrequencyChart;