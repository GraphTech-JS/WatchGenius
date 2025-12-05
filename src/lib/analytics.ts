type EventParams = Record<string, string | number | boolean | null | undefined>;

export interface AnalyticsEvents {
  hero_exposed: {
    timestamp?: number;
    viewport_height?: number;
  };

  cta_click: {
    button_type: 'catalog' | 'chat';
    position: 'hero' | 'header' | 'footer';
  };

  catalog_view: {
    filters_count?: number;
    sort_option?: string;
    results_count?: number;
  };

  filter_change: {
    filter_type: string;
    filter_value: string;
    active_filters_count?: number;
  };

  sort_change: {
    sort_option: string;
    previous_sort?: string;
  };

  card_click: {
    product_id: string;
    product_slug: string;
    brand: string;
    price?: number;
    position_in_grid?: number;
  };

  chat_open: {
    source: 'hero' | 'floating_button' | 'header' | 'footer';
  };

  quote_submit_open: {
    product_id?: string;
    product_title?: string;
  };

  quote_submit_sent: {
    product_id?: string;
    product_title?: string;
    form_fields_count?: number;
  };

  price_alert_sub: {
    product_id?: string;
    target_price: number;
    currency: string;
    brand?: string;
    model?: string;
  };

  watchlist_save: {
    product_id: string;
    source?: 'card' | 'product_page' | 'compare_page';
  };

  watchlist_remove: {
    product_id: string;
    source?: 'card' | 'product_page' | 'compare_page';
  };
}

export type EventName = keyof AnalyticsEvents;

let eventQueue: Array<{ eventName: string; params: EventParams }> = [];
let isGtmReady = false;

function checkGtmReady(): boolean {
  if (typeof window === 'undefined') return false;

  const hasDataLayer =
    typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer);

  const hasGtag = typeof window.gtag !== 'undefined';

  return hasDataLayer || hasGtag;
}

function sendViaDataLayer(eventName: string, params: EventParams): void {
  if (typeof window === 'undefined' || !window.dataLayer) return;

  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

function sendViaGtag(eventName: string, params: EventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function')
    return;

  window.gtag('event', eventName, params);
}

function flushEventQueue(): void {
  if (eventQueue.length === 0) return;

  eventQueue.forEach(({ eventName, params }) => {
    sendViaDataLayer(eventName, params);
    sendViaGtag(eventName, params);
  });

  eventQueue = [];
}

function initGtmCheck(): void {
  if (typeof window === 'undefined') return;

  let attempts = 0;
  const maxAttempts = 50;

  const check = () => {
    attempts++;

    if (checkGtmReady()) {
      isGtmReady = true;
      flushEventQueue();
      return;
    }

    if (attempts < maxAttempts) {
      setTimeout(check, 100);
    } else {
      eventQueue = [];
    }
  };

  check();
}

export function trackEvent<T extends EventName>(
  eventName: T,
  params: AnalyticsEvents[T]
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ) as EventParams;

  if (isGtmReady || checkGtmReady()) {
    isGtmReady = true;
    sendViaDataLayer(eventName, cleanParams);
    sendViaGtag(eventName, cleanParams);
    return;
  }

  eventQueue.push({
    eventName,
    params: cleanParams,
  });
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  if (checkGtmReady()) {
    isGtmReady = true;
    flushEventQueue();
    return;
  }

  initGtmCheck();

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      if (checkGtmReady() && !isGtmReady) {
        isGtmReady = true;
        flushEventQueue();
      }
    });
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      initAnalytics();
    });
  } else {
    setTimeout(() => {
      initAnalytics();
    }, 0);
  }
}
