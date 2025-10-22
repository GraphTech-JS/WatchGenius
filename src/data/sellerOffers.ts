export interface SellerOffer {
  id: string;
  sellerName: string;
  rating: number;
  reviewsCount: number;
  location: string;
  details: string;
  shipping: string;
  price: string;
  currency: '€' | '$' | '₴';
  isSecure: boolean;
}

const sellers = [
  { name: 'Crown and Caliber', location: 'США, Атланта', rating: 4.9 },
  { name: 'Chrono24 Premium', location: 'Німеччина, Мюнхен', rating: 4.7 },
  { name: 'WatchBox', location: 'США, Нью-Йорк', rating: 4.5 },
  { name: 'Swiss Watches', location: 'Швейцарія, Цюрих', rating: 4.8 },
  { name: 'Tokyo Time', location: 'Японія, Токіо', rating: 4.2 },
  { name: 'Paris Luxury', location: 'Франція, Париж', rating: 4.6 },
];

const conditions = [
  'Новий з документами',
  'Відмінний стан, Б/У',
  'Новий з гарантією',
  'Відновлений, Б/У',
  'Новий з сертифікатом',
  'Відмінний стан з коробкою',
];

const shippingOptions = [
  'Безкоштовна доставка',
  'Доставка від €50',
  'Доставка від €75',
  'Доставка від €100',
  'Доставка від €120',
];

export const generateSellerOffers = (watchId: string, basePrice: number): SellerOffer[] => {
  const seed = watchId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const numOffers = 6;
  
  const selectedSellers = sellers
    .sort((a, b) => {
      const aHash = a.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const bHash = b.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (aHash + bHash + seed) % 2 === 0 ? -1 : 1;
    })
    .slice(0, numOffers);

  const securityPatterns = [
    [true, true, false, true, true, false], 
    [true, false, true, true, false, true], 
    [false, true, true, false, true, true], 
    [true, true, true, false, true, false], 
    [false, true, true, true, false, true], 
    [true, false, true, true, true, false], 
  ];
  
  const patternIndex = seed % securityPatterns.length;
  const pattern = securityPatterns[patternIndex];

  return selectedSellers.map((seller, index) => {
    const priceSeed = seed + index;
    const priceVariation = 0.85 + (priceSeed % 30) / 100; 
    const offerPrice = Math.round(basePrice * priceVariation);
    
    return {
      id: `${watchId}-seller-${index + 1}`,
      sellerName: seller.name,
      rating: seller.rating,
      reviewsCount: 100 + (priceSeed % 300),
      location: seller.location,
      details: conditions[index % conditions.length],
      shipping: shippingOptions[index % shippingOptions.length],
      price: offerPrice.toLocaleString(),
      currency: '€' as const,
      isSecure: pattern[index], 
    };
  });
};
