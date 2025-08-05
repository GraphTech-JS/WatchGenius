import { SelectOption } from "@/components/Select";

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

export const data = [
  { label: "Матеріал", value: "Нержавіюча сталь Oystersteel (сплав 904L)" },
  { label: "Калібр", value: "126610LV" },
  { label: "Рік", value: "2000 рік" },
  { label: "Діаметр", value: "41 мм" },
  { label: "Стан", value: "новий" },
];

export interface FilterDefinition {
  id: number;
  label: string;
  value: string;
  options: SelectOption[];
}

export const priceOptions = [
  { value: "", label: "Всі" },
  { value: "cheap_to_expensive", label: "Від дешевих до дорогих" },
  { value: "expensive_to_cheap", label: "Від дорогих до дешевих" },
  { value: "new", label: "Новинки" },
  { value: "best", label: "Найкращі" },
];

export const noveltyOptions = [
  { value: "", label: "Всі" },
  { value: "new", label: "Нові" },
  { value: "old", label: "Старі" },
];

export const indexOptions = [
  { value: "", label: "Всі" },
  { value: "asc", label: "За індексом ↑" },
  { value: "desc", label: "За індексом ↓" },
];

export const movementOptions = [
  { value: "", label: "Всі" },
  { value: "Automatic", label: "Automatic" },
  { value: "spring", label: "Spring Drive" },
  { value: "manual", label: "Manual Winding" },
];

export const complicationOptions = [
  { value: "", label: "Всі" },
  { value: "chronograph", label: "Chronograph" },
  { value: "date", label: "Date Display" },
  { value: "gmt", label: "GMT / Dual Time" },
  { value: "Date", label: "Date" },
  { value: "Chronograph", label: "Chronograph" },
  { value: "Moon Phase", label: "Moon Phase" },
];

export const trendOptions = [
  { value: "", label: "Всі" },
  { value: "up", label: "↑ Ріст (3м)" },
  { value: "down", label: "↓ Падіння (3м)" },
  { value: "flat", label: "– Стабільно (3м)" },
];

export const brandOptions = [
  { value: "", label: "Всі" },
  { value: "tag-heuer", label: "TAG Heuer" },
  { value: "tudor", label: "Tudor" },
  { value: "chanel", label: "Chanel" },
  { value: "montblanc", label: "Montblanc" },
  { value: "hermes", label: "Hermès" },
  { value: "bremont", label: "Bremont" },
  { value: "tiffany-and-co", label: "Tiffany & Co." },
  { value: "bunkyo-tokyo", label: "Bunkyo Tokyo" },
  { value: "ming", label: "Ming" },
  { value: "minase", label: "Minase" },
  { value: "louis-erard", label: "Louis Erard" },
  { value: "breitling", label: "Breitling" },
  { value: "iwc", label: "IWC" },
  { value: "cartier", label: "Cartier" },
  { value: "dior", label: "Dior" },
  { value: "chronoswiss", label: "Chronoswiss" },
  { value: "omega", label: "Omega" },
  { value: "grand-seiko", label: "Grand Seiko" },
  { value: "zenith", label: "Zenith" },
  { value: "bulgari", label: "Bulgari" },
  { value: "corum", label: "Corum" },
  { value: "louis-vuitton", label: "Louis Vuitton" },
  { value: "ralph-lauren", label: "Ralph Lauren" },
  { value: "officine-panerai", label: "Officine Panerai" },
  { value: "baume-and-mercier", label: "Baume & Mercier" },
  { value: "franck-muller", label: "Franck Muller" },
  { value: "chopard", label: "Chopard" },
  { value: "glashutte-original", label: "Glashütte Original" },
  { value: "rolex", label: "Rolex" },
  { value: "jaeger-lecoultre", label: "Jaeger-LeCoultre" },
  { value: "blancpain", label: "Blancpain" },
  { value: "girard-perregaux", label: "Girard-Perregaux" },
  { value: "hublot", label: "Hublot" },
  { value: "roger-dubuis", label: "Roger Dubuis" },
  { value: "harry-winston", label: "Harry Winston" },
  { value: "patek-philippe", label: "Patek Philippe" },
  { value: "vacheron-constantin", label: "Vacheron Constantin" },
  { value: "audemars-piguet", label: "Audemars Piguet" },
  { value: "piaget", label: "Piaget" },
  { value: "bovet", label: "Bovet" },
  { value: "breguet", label: "Breguet" },
  { value: "a-lange-and-sohne", label: "A. Lange & Söhne" },
  { value: "fp-journe", label: "F.P. Journe" },
  { value: "van-cleef-and-arpels", label: "Van Cleef & Arpels" },
  { value: "jaquet-droz", label: "Jaquet Droz" },
  { value: "czapek", label: "Czapek" },
  { value: "arnold-and-son", label: "Arnold & Son" },
  { value: "armin-strom", label: "Armin Strom" },
  { value: "urwerk", label: "Urwerk" },
  { value: "richard-mille", label: "Richard Mille" },
];

export const diameterOptions = [
  { value: "", label: "Всі" },
  { value: "35", label: "35 mm" },
  { value: "36", label: "36 mm" },
  { value: "37", label: "37 mm" },
  { value: "38", label: "38 mm" },
  { value: "39", label: "39 mm" },
  { value: "40", label: "40 mm" },
  { value: "41", label: "41 mm" },
  { value: "42", label: "42 mm" },
  { value: "43", label: "43 mm" },
  { value: "44", label: "44 mm" },
  { value: "45", label: "45 mm" },
  { value: "46", label: "46 mm" },
  { value: "47", label: "47 mm" },
  { value: "48", label: "48 mm" },
  { value: "49", label: "49 mm" },
  { value: "50", label: "50 mm" },
];
