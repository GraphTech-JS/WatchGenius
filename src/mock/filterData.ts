export const filterData = {
  brands: [
    'Rolex',
    'Patek Philippe',
    'Vacheron Constantin',
    'Audemars Piguet',
    'Omega',
    'Tudor',
    'Cartier',
  ],
  
  conditions: ['Новий', 'Відмінний', 'Б/у'],
  
  mechanisms: [
    'Механічний',
    'Кварцовий',
    'Кінетичний',
    'Автоматичний',
    'Spring Drive',
  ],
  
  materials: ['Золото', 'Срібло', 'Титан', 'Кераміка'],
  
  documents: ['Тільки з документами і коробкою'],
  
  locations: ['Європа', 'Азія', 'Америка'],
  
  indexButtons: ['A', 'B', 'C'] as const,
  
  sections: [
    'Бренд',
    'Ціна',
    'Індекс',
    'Стан',
    'Механізм',
    'Матеріал',
    'Рік',
    'Документи',
    'Локація',
  ] as const,
} as const;

export type IndexButton = typeof filterData.indexButtons[number];
export type FilterSection = typeof filterData.sections[number];