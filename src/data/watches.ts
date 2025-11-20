import type { StaticImageData } from 'next/image';
import { RolexCatalog, RolexBrand } from '../../public/watch';
import type { WatchItem, WatchIndex } from '@/interfaces';

const createWatches = (): WatchItem[] => {
  const brands = ['Rolex', 'Patek Philippe', 'Omega', 'Tudor', 'Cartier'];
  const conditions = ['Новий', 'Відмінний', 'Б/у'];
  const mechanisms = ['Механічний', 'Кварцовий', 'Автоматичний'];
  const materials = ['Золото', 'Срібло', 'Титан', 'Кераміка'];
  const braceletMaterials = ['Сталь', 'Золото', 'Кераміка', 'Титан', 'Шкіра'];
  const documents = ['Тільки з документами і коробкою'];
  const locations = ['Європа', 'Азія', 'Америка'];
  const years = [2000, 2001, 2002, 2003, 2004, 2005];
  const indices: WatchIndex[] = ['A', 'B', 'C'];

  const items: WatchItem[] = [];

  for (let i = 0; i < 24; i++) {
    const brand = brands[i % brands.length];
    const index = indices[i % indices.length];
    const condition = conditions[i % conditions.length];
    const mechanism = mechanisms[i % mechanisms.length];
    const material = materials[i % materials.length];
    const braceletMaterial = braceletMaterials[i % braceletMaterials.length];
    const location = locations[i % locations.length];
    const year = years[i % years.length];

    const isBrandCard = i % 6 === 2;
    const variant: 'product' | 'brand' = isBrandCard ? 'brand' : 'product';
    const image = isBrandCard ? RolexBrand : RolexCatalog;
    const buttonLabel = index === 'B' ? 'Get Quote' : 'Buy on Chrono24';
    const trendValue = index === 'B' ? -5 : index === 'C' ? -2 : 7;
    const price = 15000 + i * 1000;

    const diameterMm = 38 + (i % 6);
    const waterResistance = (i % 2) === 0;
    const chronograph = (i % 3) === 0;

    items.push({
      id: `w-${i + 1}`,
      slug: `${brand.toLowerCase().replace(' ', '-')}-submariner-${i + 1}`,
      title: `${brand} Submariner`,
      price,
      currency: '€',
      index,
      image,
      brandLogo: isBrandCard ? (RolexBrand as StaticImageData) : undefined,
      buttonLabel,
      trend: { value: trendValue, period: '90d' },
      variant,
      diameterMm,
      waterResistance,
      chronograph,
      brand,
      condition,
      mechanism,
      material,
      braceletMaterial,
      documents: documents[0],
      location,
      year,
      reference: `${210 + (i % 10)}.${30 + (i % 5)}.${42 + (i % 3)}.${20 + (i % 2)}.0${1 + (i % 9)},${String(i + 1).padStart(4, '0')}`,
    });
  }

  return items;
};

export const WATCHES: WatchItem[] = createWatches();

export const watchesMock: WatchItem[] = WATCHES;


