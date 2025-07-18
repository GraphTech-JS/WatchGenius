'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import supabase from '../lib/supabaseClient';

type PriceEntry = {
  id: string;
  watch_id: string;
  date: string;
  price: number;
};

type Props = {
  watchId: string;
};

export default function PriceChart({ watchId }: Props) {
  const [data, setData] = useState<PriceEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('price_history')
        .select('*')
        .eq('watch_id', watchId)
        .order('date', { ascending: true });

      if (error) {
        console.error('Помилка завантаження графіка:', error);
      } else {
        setData(data || []);
      }
    };

    fetchData();
  }, [watchId]);

  return (
    <div className="w-full h-[300px] p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Ціни за часом</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
