# API Response Structure: GET /api/watches/liquid/volume

## Опис
Повертає список 6 годинників, лідерів за ліквідністю, суму угод і загальну вартість, також повертає історію лідерів ліквідності для графіку.

## Структура відповіді

```typescript
interface LiquidVolumeResponse {
  // Масив з 6 годинників-лідерів
  watches: Array<{
    // Повна інформація про годинник (стандартна структура ApiWatchFullResponse)
    id: string;
    name: string;
    model: string;
    description: string | null;
    ref: string;
    chronoUrl: string;
    createdAt: string;
    year: number;
    mechanism: string;
    material: string;
    hasDocuments: string;
    location: string;
    brandId: number;
    imageUrls: string[];
    braceletMaterial: string;
    caseDiameter: string;
    isChronograph: boolean;
    waterResistance: boolean;
    condition: string;
    
    // Інформація про бренд
    brand: {
      id: number;
      name: string;
      country: string;
      segment: string;
      brandIndex: number | null;
      description: string;
    };
    
    // Історія цін
    priceHistory: Array<{
      id: string;
      price: number;
      recordedAt: string;
      watchId: string;
      currency: string;
    }>;
    
    // Аналітика
    analytics: {
      id: string;
      watchId: string;
      trend90d: number;
      trend30d: number;
      volatility: number;
      liquidity: number;
      popularity: number;
      updatedAt: string;
      watch: {
        // Повна інформація про годинник (дублюється)
        // ... те саме що і на верхньому рівні
      };
      priceHistory: Array<{
        // Історія цін (дублюється)
        // ... те саме що і на верхньому рівні
      }>;
    };
    
    // Сума угод для цього годинника
    volumeSum: number;
  }>;
  
  // Загальна ліквідність (сума всіх liquidity з watches)
  totalLiquidity: number;
  
  // Загальна сума угод
  totalVolume: {
    value: number;
    currency: string; // "USD"
  };
  
  // Історія лідерів ліквідності для графіку
  history: Array<{
    date: string; // ISO date string
    liquiditySum: number;
    volumeSum: number;
    currency: string; // "USD"
  }>;
}
```

## Приклад використання

```typescript
// В src/lib/api.ts
export async function getLiquidVolume(
  currency?: string
): Promise<LiquidVolumeResponse> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/liquid/volume${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);
    return handleResponse<LiquidVolumeResponse>(response);
  } catch (error) {
    console.error('❌ [API] Failed to fetch liquid volume:', error);
    throw error;
  }
}
```

## Примітки
- Масив `watches` завжди містить 6 елементів (лідери за ліквідністю)
- Масив `history` поки містить 1 запис, але вони автоматично будуть генеруватись
- `volumeSum` - це сума угод для конкретного годинника
- `totalVolume.value` - загальна сума всіх угод
- `totalLiquidity` - сума всіх liquidity з масиву watches

