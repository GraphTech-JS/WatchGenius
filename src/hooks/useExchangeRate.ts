import { useEffect, useState } from "react";

export const useExchangeRate = (valcode: string = "USD") => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${valcode}&json`
        );
        const data = await res.json();
        setRate(data[0]?.rate ?? null);
      } catch (err) {
        setError("Не вдалося отримати курс");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [valcode]);

  return { rate, loading, error };
};
