import { IWatch } from "@/interfaces";
import MockWatch from "../../public/watch/Rolex.png";

export const mockCards: IWatch[] = [
  {
    id: 1,
    slug: "dsfww",
    image: MockWatch.src,
    title: "Top Gainers 90d",
    brand: "Rolex Submariner Oyster Perpetual",
    price: 10000,
    rating: 10,
    changePercent: 33,
    chartData: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    chartColor: "#22c55e",
    chartId: "chart1",
  },
  {
    id: 2,
    slug: "dsfw5",
    image: MockWatch.src,
    title: "Stable Picks 90d",
    brand: "Rolex Submariner Oyster Perpetual",
    price: 10000,
    rating: 10,
    changePercent: 0,
    chartData: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    chartColor: "#EED09D",
    chartId: "chart2",
  },
];
