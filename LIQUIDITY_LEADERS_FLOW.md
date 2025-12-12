# 🔄 Потік роботи "Liquidity Leaders"

## 📋 Огляд
Цей документ описує, як працює функціонал "Liquidity Leaders" від відображення на головній сторінці до фільтрації в каталозі.

---

## 🗂️ Пов'язані файли

### 1. **Відображення на головній сторінці**

#### `src/features/home/Market/Market.tsx`
- **Роль:** Відображає секцію "Market overview" з карткою "Liquidity Leaders"
- **Ключові моменти:**
  - Завантажує дані через `getLiquidVolume(currency)` (рядки 229, 243-245)
  - Створює картку `MarketTotal` з `title='Liquidity Leaders'` (рядки 324-336, 383-395)
  - Передає дані: `totalLiquidity`, `totalVolume`, `history` для графіка

#### `src/components/Main/Market/MarketCard/MarketTotal.tsx`
- **Роль:** Компонент картки "Liquidity Leaders" з кнопкою переходу в каталог
- **Ключові моменти:**
  - **Рядки 108-117:** Кнопка "Перейти в каталог"
  - **Рядок 110-111:** Якщо `title === 'Liquidity Leaders'`, то посилання = `/catalog?sortByLiquidity=true`
  - Інакше посилання = `/catalog`

---

### 2. **Обробка параметра в каталозі**

#### `src/app/[locale]/catalog/page.tsx`
- **Роль:** Головна сторінка каталогу
- **Ключові моменти:**
  - Використовує `useCatalogSearch()` хук (рядок 27)
  - Передає `search.filteredItems` в `CatalogGrid` (рядок 262)

#### `src/hooks/useCatalogSearch.ts`
- **Роль:** Основний хук для управління пошуком, фільтрами та сортуванням
- **Ключові моменти:**

  **a) Читання параметра з URL:**
  ```typescript
  // Рядок 284-285
  const sortByLiquidityParam = searchParams.get('sortByLiquidity');
  const isSortByLiquidity = sortByLiquidityParam === 'true';
  ```

  **b) Фільтрація без клієнтського сортування:**
  ```typescript
  // Рядки 283-299
  const filteredItems = useMemo(() => {
    const sortByLiquidityParam = searchParams.get('sortByLiquidity');
    const isSortByLiquidity = sortByLiquidityParam === 'true';
    
    let items: WatchItem[] = watches;

    // ⚠️ ВАЖЛИВО: Якщо sortByLiquidity=true, повертаємо items БЕЗ сортування
    // Бекенд вже відсортував дані, не треба пересортовувати на клієнті!
    if (isSortByLiquidity) {
      return items;
    }

    // Інакше застосовуємо звичайну фільтрацію та сортування
    if (selectedIndexes.length > 0) {
      items = items.filter((w) => selectedIndexes.includes(w.index));
    }
    const sorted = applySorting(items, sortOption);
    return sorted;
  }, [watches, selectedIndexes, sortOption, searchParams]);
  ```

  **c) Формування запиту до API:**
  ```typescript
  // Рядки 340-381
  useEffect(() => {
    const sortByLiquidityParam = searchParams.get('sortByLiquidity');
    
    const apiParams: GetWatchesParams = 
      !searchTerm.trim() && !sidebarFilters
        ? {
            pageSize: sortByLiquidityParam === 'true' ? 100 : 12, // ⬆️ Більше елементів для liquidity
            currency: currency,
            // ⚠️ ВАЖЛИВО: Не передаємо segment, якщо sortByLiquidity=true
            ...(selectedIndexes.length > 0 && sortByLiquidityParam !== 'true' && {
              segment: selectedIndexes.join('/'),
            }),
            ...(sortByLiquidityParam === 'true' && { sortByLiquidity: true }),
          }
        : {
            // ... інші параметри
            pageSize: sortByLiquidityParam === 'true' ? 100 : 12,
            ...(sortByLiquidityParam === 'true' && { sortByLiquidity: true }),
          };

    reloadWithFilters(apiParams);
  }, [searchTerm, sidebarFilters, selectedIndexes, searchParams, ...]);
  ```

  **d) Очищення параметра при зміні сортування:**
  ```typescript
  // Рядки 256-261
  const handleSortChange = (newSort: SortOption) => {
    if (newSort !== sortOption) {
      const url = new URL(window.location.href);
      url.searchParams.delete('sortByLiquidity'); // 🗑️ Видаляємо параметр
      window.history.pushState({}, '', url.toString());
    }
    // ...
  };
  ```

---

### 3. **Запит до API**

#### `src/hooks/useWatches.ts`
- **Роль:** Хук для завантаження годинників з API
- **Ключові моменти:**

  **a) Функція `reloadWithFilters`:**
  ```typescript
  // Рядки 66-107
  const reloadWithFilters = useCallback(async (filters: GetWatchesParams) => {
    // ...
    // ⚠️ sortByLiquidity НЕ враховується при перевірці фільтрів для кешу
    const hasFilters = Object.keys(filters).filter(
      k => k !== 'page' && k !== 'pageSize' && k !== 'currency' && k !== 'sortByLiquidity'
    ).length > 0;
    
    const finalPageSize = filters.pageSize || (hasFilters ? 1000 : 12);
    
    const response = await getWatches({ 
      page: 1, 
      pageSize: finalPageSize, 
      ...filtersWithoutPageSize 
    });
    // ...
  }, []);
  ```

#### `src/lib/api.ts`
- **Роль:** Функції для роботи з API
- **Ключові моменти:**

  **Функція `getWatches`:**
  ```typescript
  // Рядки 44-76
  export async function getWatches(params: GetWatchesParams) {
    const searchParams = new URLSearchParams();
    // ... інші параметри
    if (params.sortByLiquidity !== undefined) {
      searchParams.set('sortByLiquidity', params.sortByLiquidity.toString());
    }
    
    const url = `/api/watches?${searchParams.toString()}`;
    // Запит: /api/watches?sortByLiquidity=true&pageSize=100&currency=EUR
    return handleResponse<ApiWatchListResponse>(response);
  }
  ```

---

### 4. **Типи та інтерфейси**

#### `src/interfaces/api.ts`
- **Роль:** TypeScript інтерфейси для API
- **Ключові моменти:**
  ```typescript
  // Рядок 53
  export interface GetWatchesParams {
    // ...
    sortByLiquidity?: boolean;
  }
  ```

---

## 🔄 Повний потік роботи

### Крок 1: Користувач натискає "Перейти в каталог"
```
MarketTotal.tsx (рядок 108-117)
  ↓
href="/catalog?sortByLiquidity=true"
  ↓
Перехід на сторінку каталогу
```

### Крок 2: Каталог читає параметр з URL
```
catalog/page.tsx
  ↓
useCatalogSearch() хук
  ↓
useCatalogSearch.ts (рядок 284)
  ↓
searchParams.get('sortByLiquidity') === 'true'
```

### Крок 3: Формується запит до API
```
useCatalogSearch.ts (рядки 340-381)
  ↓
apiParams = {
  pageSize: 100,           // ⬆️ Більше елементів
  currency: 'EUR',
  sortByLiquidity: true,   // ✅ Параметр сортування
  // ❌ НЕ передаємо segment (A/B/C)
}
  ↓
reloadWithFilters(apiParams)
  ↓
useWatches.ts → reloadWithFilters()
  ↓
getWatches(apiParams)
```

### Крок 4: Запит до бекенду
```
api.ts → getWatches()
  ↓
URL: /api/watches?sortByLiquidity=true&pageSize=100&currency=EUR
  ↓
Бекенд сортує годинники по ліквідності
  ↓
Повертає відсортований список
```

### Крок 5: Обробка відповіді
```
useWatches.ts → reloadWithFilters()
  ↓
transformApiWatch() для кожного годинника
  ↓
setWatches(transformed)
  ↓
useCatalogSearch.ts → filteredItems
```

### Крок 6: Відображення в каталозі
```
useCatalogSearch.ts (рядки 283-299)
  ↓
if (isSortByLiquidity) {
  return items; // ✅ Без додаткового сортування!
}
  ↓
CatalogGrid отримує filteredItems
  ↓
Відображає годинники в порядку від бекенду
```

---

## ⚠️ Важливі моменти

### 1. **Не сортувати на клієнті, коли `sortByLiquidity=true`**
- Бекенд вже відсортував дані по ліквідності
- Клієнтське сортування перезапише порядок від бекенду
- **Рішення:** Повертаємо `items` без `applySorting()` (рядок 290)

### 2. **Не передавати `segment` при `sortByLiquidity=true`**
- `segment` (A/B/C) фільтрує годинники по індексу
- Це конфліктує з сортуванням по ліквідності
- **Рішення:** Умовно додаємо `segment` тільки якщо `sortByLiquidity !== 'true'` (рядки 365, 377)

### 3. **Збільшений `pageSize` для liquidity**
- За замовчуванням: `pageSize: 12`
- Для liquidity: `pageSize: 100`
- **Причина:** Показати більше годинників з високою ліквідністю

### 4. **Очищення параметра при зміні сортування**
- Якщо користувач вибирає інше сортування (наприклад, "За ціною")
- Параметр `sortByLiquidity` видаляється з URL
- **Рішення:** `url.searchParams.delete('sortByLiquidity')` (рядок 261)

---

## 🧪 Як перевірити

1. **Відкрити головну сторінку:**
   - Знайти секцію "Market overview"
   - Знайти картку "Liquidity Leaders"

2. **Натиснути "Перейти в каталог":**
   - URL має бути: `/catalog?sortByLiquidity=true`

3. **Перевірити Network tab:**
   - Запит: `GET /api/watches?sortByLiquidity=true&pageSize=100&currency=EUR`
   - Відповідь: Відсортований список годинників

4. **Перевірити порядок годинників:**
   - Годинники мають бути відсортовані по ліквідності (від високої до низької)
   - Не має бути додаткового клієнтського сортування

5. **Змінити сортування:**
   - Вибрати інше сортування в каталозі
   - Параметр `sortByLiquidity` має зникнути з URL

---

## 📝 Резюме файлів

| Файл | Роль | Ключові рядки |
|------|------|---------------|
| `Market.tsx` | Відображення секції на головній | 324-336, 383-395 |
| `MarketTotal.tsx` | Кнопка переходу в каталог | 108-117 |
| `catalog/page.tsx` | Сторінка каталогу | 27, 262 |
| `useCatalogSearch.ts` | Логіка фільтрації та сортування | 284-299, 340-381, 256-261 |
| `useWatches.ts` | Завантаження даних з API | 66-107 |
| `api.ts` | Формування запиту | 44-76 |
| `api.ts` (interfaces) | TypeScript типи | 53 |

---

## 🎯 Висновок

Функціонал "Liquidity Leaders" працює так:
1. **Головна сторінка** → показує картку з кнопкою
2. **Кнопка** → переходить на `/catalog?sortByLiquidity=true`
3. **Каталог** → читає параметр, формує запит з `sortByLiquidity=true`
4. **API** → відправляє запит до бекенду
5. **Бекенд** → сортує по ліквідності, повертає дані
6. **Каталог** → відображає годинники БЕЗ додаткового сортування

**Головне правило:** Коли `sortByLiquidity=true`, не застосовувати клієнтське сортування та не фільтрувати по `segment`!

