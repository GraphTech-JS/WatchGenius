"use client";

// import { useEffect, useState } from "react";
// import supabase from "../lib/supabaseClient";

import { useGetWatches } from "@/hooks/useGetWatches";

// type Watch = {
//   id: string;
//   brand: string;
//   ref: string;
//   name: string;
//   image_url: string;
// };

export default function WatchesList() {
  // const [watches, setWatches] = useState<Watch[]>([]);
  const { data: watches = [], isLoading, error } = useGetWatches();

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при завантаженні годинників</p>;

  // useEffect(() => {
  //   const fetchWatches = async () => {
  //     const { data, error } = await supabase.from("watches").select("*");
  //     if (error) console.error("Помилка завантаження:", error);
  //     else setWatches(data || []);
  //   };

  //   fetchWatches();
  // }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Список годинників</h2>
      <ul className="space-y-2">
        {watches.map((watch) => (
          <li key={watch.id} className="border p-3 rounded-lg">
            <strong>{watch.brand}</strong> — {watch.name} ({watch.ref})
            <br />
            <img src={watch.image_url} alt={watch.name} className="h-32 mt-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
