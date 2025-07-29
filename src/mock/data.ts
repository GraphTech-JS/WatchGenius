export type DataPoint = {
  date: string;
  price: number;
  price_usd: number;
};

export const yearDataMock: DataPoint[] = [
  { date: "01/01/2020", price: 33500, price_usd: 800 },
  { date: "15/01/2020", price: 34000, price_usd: 810 },
  { date: "01/02/2020", price: 34500, price_usd: 820 },
  { date: "15/02/2020", price: 35000, price_usd: 830 },
  { date: "01/03/2020", price: 35500, price_usd: 840 },
  { date: "12/03/2020", price: 36000, price_usd: 850 },
  { date: "01/04/2020", price: 37000, price_usd: 860 },
  { date: "15/04/2020", price: 37500, price_usd: 870 },
  { date: "01/05/2020", price: 38000, price_usd: 880 },
  { date: "15/05/2020", price: 38500, price_usd: 890 },
  { date: "01/06/2020", price: 39000, price_usd: 900 },
  { date: "15/06/2020", price: 39500, price_usd: 910 },
  { date: "01/07/2020", price: 40000, price_usd: 920 },
  { date: "15/07/2020", price: 40500, price_usd: 930 },
  { date: "01/08/2020", price: 41000, price_usd: 940 },
  { date: "15/08/2020", price: 41500, price_usd: 950 },
  { date: "01/09/2020", price: 42000, price_usd: 960 },
  { date: "15/09/2020", price: 42500, price_usd: 970 },
];

export const threeMonthDataMock: DataPoint[] = [
  { date: "20/01/2020", price: 1200, price_usd: 40 },
  { date: "20/02/2020", price: 1000, price_usd: 35 },
  { date: "20/03/2020", price: 1600, price_usd: 50 },
  { date: "23/03/2020", price: 1600, price_usd: 50 },
  { date: "27/03/2020", price: 1200, price_usd: 40 },
  { date: "26/03/2020", price: 1100, price_usd: 37 },
  { date: "28/03/2020", price: 1540, price_usd: 51 },
  { date: "29/03/2020", price: 1320, price_usd: 45 },
  { date: "30/03/2020", price: 4000, price_usd: 135 },
];
